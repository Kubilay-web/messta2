import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartItems, countryId } = body;

    console.log('Received cart items:', JSON.stringify(cartItems, null, 2));
    console.log('Received countryId:', countryId);

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    if (!countryId) {
      return NextResponse.json(
        { error: 'Country ID is required' },
        { status: 400 }
      );
    }

    // DEBUG: Cart items'daki tüm storeId'leri göster
    console.log('All storeIds in cart items:');
    cartItems.forEach((item, index) => {
      console.log(`Item ${index}: storeId = "${item.storeId}"`, {
        type: typeof item.storeId,
        length: item.storeId?.length,
        trimmed: item.storeId?.trim(),
        isEmpty: item.storeId?.trim() === ''
      });
    });

    // Cart items'da benzersiz store ID'lerini topla
    const storeIds = [...new Set(
      cartItems
        .map(item => item.storeId)
        .filter(storeId => {
          const isValid = storeId && 
                         typeof storeId === 'string' && 
                         storeId.trim() !== '' && 
                         storeId !== 'undefined' && 
                         storeId !== 'null';
          
          console.log(`Filtering storeId: "${storeId}" -> ${isValid}`);
          return isValid;
        })
        .map(storeId => storeId.trim())
    )];

    console.log('Unique store IDs from cart:', storeIds);
    console.log('Number of unique store IDs:', storeIds.length);



    // Tüm store'ları tek seferde al
    const stores = await db.store.findMany({
      where: { id: { in: storeIds } },
    });

    console.log('Found stores:', stores.map(s => ({ id: s.id, name: s.name })));
    console.log('Number of stores found:', stores.length);


    // Store ID'ye göre store'ları map'le
    const storeMap = new Map();
    stores.forEach(store => {
      storeMap.set(store.id, store);
    });

    // Tüm store'lar için shipping rate'leri tek seferde al
    const shippingRates = await db.shippingRate.findMany({
      where: {
        countryId,
        storeId: { in: storeIds },
      },
    });

    console.log('Shipping rates found:', shippingRates.length);

    // Store bazlı shipping rate'leri map'le
    const shippingRateMap = new Map();
    shippingRates.forEach(rate => {
      shippingRateMap.set(rate.storeId, rate);
    });

    // Ürün ID'lerini topla
    const productIds = [...new Set(cartItems.map(item => item.productId))];
    
    console.log('Product IDs to fetch:', productIds);

    // Tüm ürünleri tek seferde al
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
      include: {
        freeShipping: {
          include: {
            eligableCountries: true,
          },
        },
        variants: {
          where: {
            id: { in: cartItems.map(item => item.variantId) }
          }
        }
      },
    });

    console.log('Products found:', products.length);

    // Ürün ID'ye göre map'le
    const productMap = new Map();
    products.forEach(product => {
      productMap.set(product.id, product);
    });

    // Store bazlı shipping sonuçları
    const storeShippingBreakdown = [];
    let totalShippingFee = 0;

    // Store'ları gruplayarak hesapla
    for (const storeId of storeIds) {
      const store = storeMap.get(storeId);
      if (!store) {
        console.log(`Store not found in storeMap: ${storeId}`);
        continue;
      }

      // Bu store'a ait cart items'ları filtrele
      const storeCartItems = cartItems.filter(item => item.storeId === storeId);
      
      console.log(`Store ${storeId} has ${storeCartItems.length} items`);

      if (storeCartItems.length === 0) {
        console.log(`No items found for store ${storeId}`);
        continue;
      }

      const shippingRate = shippingRateMap.get(storeId);
      console.log(`Shipping rate for store ${storeId}:`, shippingRate ? 'Found' : 'Not found, using defaults');
      
      let storeShippingFee = 0;

      // Bu store'daki her item için shipping hesapla
      for (const item of storeCartItems) {
        const product = productMap.get(item.productId);
        if (!product) {
          console.log(`Product not found: ${item.productId}`);
          continue;
        }

        console.log(`Processing product ${product.id}, shipping method: ${product.shippingFeeMethod}`);

        // 1. Free shipping kontrolü
        let isFreeShipping = false;

        if (product.freeShipping) {
          console.log(`Product has free shipping configuration`);
          
          // Free shipping tüm ülkeler için geçerli mi?
          if (product.freeShippingForAllCountries) {
            isFreeShipping = true;
            console.log(`Free shipping for all countries`);
          } else {
            // Bu ülke için free shipping var mı?
            const eligibleCountry = product.freeShipping?.eligableCountries?.find(
              (ec) => ec.countryId === countryId
            );
            if (eligibleCountry) {
              isFreeShipping = true;
              console.log(`Free shipping for country ${countryId}`);
            }
          }
        }

        if (isFreeShipping) {
          console.log(`Product ${product.id} has free shipping, skipping`);
          continue; // Bu ürün için shipping fee yok
        }

        // 2. Shipping method'una göre hesaplama
        const variant = product.variants?.find(v => v.id === item.variantId);
        
        if (shippingRate) {
          // Ülkeye özel rate var
          switch (product.shippingFeeMethod) {
            case 'ITEM':
              // İlk item için shipping fee
              storeShippingFee += shippingRate.shippingFeePerItem;
              console.log(`Added base item fee: ${shippingRate.shippingFeePerItem}`);
              
              // Ekstra item'lar için (quantity > 1)
              if (item.quantity > 1) {
                const additionalFee = (item.quantity - 1) * shippingRate.shippingFeeForAdditionalItem;
                storeShippingFee += additionalFee;
                console.log(`Added additional items fee: ${additionalFee}`);
              }
              break;

            case 'WEIGHT':
              // Variant weight bilgisini kullan, yoksa 0.5 kg default
              const itemWeight = variant?.weight || 0.5;
              const weightFee = itemWeight * item.quantity * shippingRate.shippingFeePerKg;
              storeShippingFee += weightFee;
              console.log(`Added weight fee: ${weightFee} (weight: ${itemWeight}, quantity: ${item.quantity})`);
              break;

            case 'FIXED':
              storeShippingFee += shippingRate.shippingFeeFixed;
              console.log(`Added fixed fee: ${shippingRate.shippingFeeFixed}`);
              break;
          }
        } else {
          // Store default değerlerini kullan
          switch (product.shippingFeeMethod) {
            case 'ITEM':
              storeShippingFee += store.defaultShippingFeePerItem;
              console.log(`Added default item fee: ${store.defaultShippingFeePerItem}`);
              
              if (item.quantity > 1) {
                const additionalFee = (item.quantity - 1) * store.defaultShippingFeeForAdditionalItem;
                storeShippingFee += additionalFee;
                console.log(`Added default additional items fee: ${additionalFee}`);
              }
              break;

            case 'WEIGHT':
              const itemWeight = variant?.weight || 0.5;
              const weightFee = itemWeight * item.quantity * store.defaultShippingFeePerKg;
              storeShippingFee += weightFee;
              console.log(`Added default weight fee: ${weightFee}`);
              break;

            case 'FIXED':
              storeShippingFee += store.defaultShippingFeeFixed;
              console.log(`Added default fixed fee: ${store.defaultShippingFeeFixed}`);
              break;
          }
        }
      }

      // Store shipping fee'yi toplama ekle (negatif olamaz)
      storeShippingFee = Math.max(0, storeShippingFee);
      totalShippingFee += storeShippingFee;

      console.log(`Total shipping fee for store ${storeId}: ${storeShippingFee}`);

      // Store bazlı detayları ekle
      storeShippingBreakdown.push({
        storeId: store.id,
        storeName: store.name,
        storeLogo: store.logo,
        shippingFee: storeShippingFee,
        itemCount: storeCartItems.length,
        estimatedDeliveryDays: {
          min: shippingRate?.deliveryTimeMin || store.defaultDeliveryTimeMin,
          max: shippingRate?.deliveryTimeMax || store.defaultDeliveryTimeMax,
        },
        shippingService: shippingRate?.shippingService || store.defaultShippingService,
      });
    }

    // Minimum shipping fee kontrolü
    totalShippingFee = Math.max(0, totalShippingFee);

    console.log('Final total shipping fee:', totalShippingFee);
    console.log('Store breakdown:', storeShippingBreakdown);

    // Tüm store'lar için ortalama delivery time hesapla
    const allMinDays = storeShippingBreakdown.map(s => s.estimatedDeliveryDays.min);
    const allMaxDays = storeShippingBreakdown.map(s => s.estimatedDeliveryDays.max);

    return NextResponse.json({
      success: true,
      shippingFee: totalShippingFee,
      currency: 'USD',
      estimatedDeliveryDays: {
        min: allMinDays.length > 0 ? Math.max(...allMinDays) : 7,
        max: allMaxDays.length > 0 ? Math.max(...allMaxDays) : 31,
      },
      storeBreakdown: storeShippingBreakdown,
      summary: {
        totalStores: storeShippingBreakdown.length,
        totalItems: cartItems.length,
      }
    });

  } catch (error: any) {
    console.error('Shipping fee calculation error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to calculate shipping fee',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}