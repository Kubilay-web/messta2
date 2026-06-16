import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // params'ı bekleyerek çöz
    const { orderId } = await params;

    const order = await db.order.findUnique({
      where: {
        id: orderId,
        userId: user.id,
      },
      include: {
        groups: {
          include: {
            items: true,
            store: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        shippingAddress: true,
        paymentDetails: true,
        user: {
          select: {
            email: true,
            displayName: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // PDF-Lib ile PDF oluştur
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 boyutu
    
    const { width, height } = page.getSize();
    const margin = 50;
    
    // Fontları göm
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Başlık
    page.drawText('INVOICE', {
      x: margin,
      y: height - margin,
      size: 25,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    
    let currentY = height - margin - 40;
    
    // Fatura bilgileri
    page.drawText(`Invoice Number: ${order.id}`, {
      x: margin,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
    
    currentY -= 20;
    page.drawText(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, {
      x: margin,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
    
    currentY -= 20;
    page.drawText(`Invoice Date: ${new Date().toLocaleDateString()}`, {
      x: margin,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
    
    currentY -= 40;
    
    // Müşteri bilgileri
    page.drawText('Bill To:', {
      x: margin,
      y: currentY,
      size: 12,
      font: helveticaBoldFont,
      underline: true,
    });
    
    currentY -= 20;
    page.drawText(order.user.displayName || 'N/A', {
      x: margin,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
    
    currentY -= 20;
    page.drawText(order.user.email, {
      x: margin,
      y: currentY,
      size: 12,
      font: helveticaFont,
    });
    
    currentY -= 40;
    
    // Gönderim adresi
    if (order.shippingAddress) {
      page.drawText('Shipping Address:', {
        x: margin,
        y: currentY,
        size: 12,
        font: helveticaBoldFont,
        underline: true,
      });
      
      currentY -= 20;
      const addressLines = [
        `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        order.shippingAddress.address1,
        order.shippingAddress.address2 || '',
        `${order.shippingAddress.city}, ${order.shippingAddress.state}`,
        order.shippingAddress.zip_code,
      ].filter(line => line.trim());
      
      addressLines.forEach(line => {
        if (line) {
          page.drawText(line, {
            x: margin,
            y: currentY,
            size: 12,
            font: helveticaFont,
          });
          currentY -= 20;
        }
      });
      currentY -= 20;
    }
    
    // Tablo başlıkları
    currentY -= 20;
    page.drawText('Item', {
      x: margin,
      y: currentY,
      size: 10,
      font: helveticaBoldFont,
    });
    
    page.drawText('Quantity', {
      x: margin + 200,
      y: currentY,
      size: 10,
      font: helveticaBoldFont,
    });
    
    page.drawText('Price', {
      x: margin + 300,
      y: currentY,
      size: 10,
      font: helveticaBoldFont,
    });
    
    page.drawText('Total', {
      x: margin + 400,
      y: currentY,
      size: 10,
      font: helveticaBoldFont,
    });
    
    // Çizgi
    currentY -= 10;
    page.drawLine({
      start: { x: margin, y: currentY },
      end: { x: width - margin, y: currentY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    
    currentY -= 20;
    
    // Ürünler
    order.groups.forEach((group) => {
      group.items.forEach((item) => {
        // Ürün adı için çok satırlı destek
        const itemName = item.name;
        const maxWidth = 180;
        const lines = [];
        let currentLine = '';
        
        for (const word of itemName.split(' ')) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = helveticaFont.widthOfTextAtSize(testLine, 10);
          
          if (testWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);
        
        // İlk satırı yaz
        page.drawText(lines[0] || item.name, {
          x: margin,
          y: currentY,
          size: 10,
          font: helveticaFont,
          maxWidth: maxWidth,
        });
        
        page.drawText(item.quantity.toString(), {
          x: margin + 200,
          y: currentY,
          size: 10,
          font: helveticaFont,
        });
        
        page.drawText(`$${item.price.toFixed(2)}`, {
          x: margin + 300,
          y: currentY,
          size: 10,
          font: helveticaFont,
        });
        
        page.drawText(`$${item.totalPrice.toFixed(2)}`, {
          x: margin + 400,
          y: currentY,
          size: 10,
          font: helveticaFont,
        });
        
        // Ek satırlar varsa
        for (let i = 1; i < lines.length; i++) {
          currentY -= 15;
          page.drawText(lines[i], {
            x: margin,
            y: currentY,
            size: 10,
            font: helveticaFont,
            maxWidth: maxWidth,
          });
        }
        
        currentY -= 25;
      });
    });
    
    currentY -= 40;
    
    // Toplamlar
    page.drawText(`Subtotal: $${order.subTotal.toFixed(2)}`, {
      x: width - margin - 150,
      y: currentY,
      size: 12,
      font: helveticaFont,
      align: 'right',
    });
    
    currentY -= 20;
    page.drawText(`Shipping: $${order.shippingFees.toFixed(2)}`, {
      x: width - margin - 150,
      y: currentY,
      size: 12,
      font: helveticaFont,
      align: 'right',
    });
    
    currentY -= 20;
    page.drawText(`Total: $${order.total.toFixed(2)}`, {
      x: width - margin - 150,
      y: currentY,
      size: 14,
      font: helveticaBoldFont,
      align: 'right',
      underline: true,
    });
    
    // PDF'i kaydet
    const pdfBytes = await pdfDoc.save();
    
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${orderId}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}