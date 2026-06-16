import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/argon2';

const prisma = new PrismaClient();

// Kullanıcı bilgileri
const TEST_USER = {
  email: 'finance@example.com',
  password: 'Finance123!',
  name: 'Finance User',
  displayName: 'Finance User',
  username: 'finance_user',
};

// Hesap isimleri
const ACCOUNT_NAMES = [
  'Chase Checking', 'Savings Account', 'Business Account', 
  'Credit Card', 'Investment Account', 'Travel Rewards',
  'Emergency Fund', 'Retirement Fund'
];

// Kategori isimleri
const CATEGORY_NAMES = [
  'Groceries', 'Dining Out', 'Shopping', 'Entertainment', 
  'Transportation', 'Utilities', 'Rent/Mortgage', 'Healthcare',
  'Education', 'Travel', 'Insurance', 'Investments',
  'Gifts', 'Clothing', 'Electronics', 'Coffee Shops',
  'Gym', 'Subscription Services', 'Pet Care'
];

// Ödeme alıcıları
const PAYEES: Record<string, string[]> = {
  Groceries: ['Walmart', 'Target', 'Costco', 'Whole Foods', 'Kroger', 'Aldi'],
  'Dining Out': ['Starbucks', 'McDonald\'s', 'Chipotle', 'Panera Bread', 'Olive Garden'],
  Shopping: ['Amazon', 'eBay', 'Best Buy', 'Home Depot', 'Lowe\'s', 'Macy\'s'],
  Entertainment: ['Netflix', 'Spotify', 'Apple Music', 'Disney+', 'HBO Max'],
  Transportation: ['Uber', 'Lyft', 'Shell', 'Exxon', 'BP', 'Chevron'],
  Utilities: ['PG&E', 'Duke Energy', 'Comcast', 'AT&T', 'Verizon', 'T-Mobile'],
  'Rent/Mortgage': ['Monthly Rent', 'Mortgage Payment', 'HOA Fees'],
  Healthcare: ['CVS', 'Walgreens', 'Rite Aid', 'Kaiser Permanente'],
  Travel: ['Delta Airlines', 'United Airlines', 'American Airlines', 'Marriott'],
  'Subscription Services': ['Adobe', 'Microsoft 365', 'Google One', 'iCloud'],
  'Coffee Shops': ['Starbucks', 'Dunkin', 'Peet\'s Coffee', 'Local Cafe'],
  Gym: ['Planet Fitness', '24 Hour Fitness', 'LA Fitness', 'Gold\'s Gym'],
  'Pet Care': ['Petco', 'Petsmart', 'Vet Clinic', 'Dog Groomer'],
};

export async function POST() {
  try {
    console.log('💰 Seeding Finance App data for test user...');

    // Önce mevcut finans verilerini temizle
    const existingUser = await prisma.user.findUnique({
      where: { email: TEST_USER.email },
    });

    if (existingUser) {
      await prisma.transaction.deleteMany({
        where: { account: { userId: existingUser.id } }
      });
      await prisma.account.deleteMany({
        where: { userId: existingUser.id }
      });
      await prisma.categoryFinance.deleteMany({
        where: { userId: existingUser.id }
      });
      await prisma.connectedBank.deleteMany({
        where: { userId: existingUser.id }
      });
      await prisma.subscriptionFinance.deleteMany({
        where: { userId: existingUser.id }
      });
      await prisma.user.delete({
        where: { email: TEST_USER.email },
      });
    }

    // Kullanıcı oluştur
    const passwordHash = await hash(TEST_USER.password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const user = await prisma.user.create({
      data: {
        email: TEST_USER.email,
        username: TEST_USER.username,
        displayName: TEST_USER.displayName,
        name: TEST_USER.name,
        passwordHash: passwordHash,
        role: 'USER',
        isVerfied: true,
        emailVerified: new Date(),
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
      },
    });

    // Banka hesapları oluştur (5 adet)
    const accounts = [];
    const selectedAccounts = ACCOUNT_NAMES.slice(0, 5);
    
    for (const accountName of selectedAccounts) {
      const account = await prisma.account.create({
        data: {
          name: accountName,
          userId: user.id,
        },
      });
      accounts.push(account);
    }

    // Kategoriler oluştur
    const categories = [];
    for (const categoryName of CATEGORY_NAMES) {
      const category = await prisma.categoryFinance.create({
        data: {
          name: categoryName,
          userId: user.id,
        },
      });
      categories.push(category);
    }

    // İşlemler oluştur
    let totalTransactions = 0;
    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    
    for (const account of accounts) {
      const transactionCount = Math.floor(Math.random() * 16) + 25;
      
      for (let i = 0; i < transactionCount; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        let payee = '';
        if (PAYEES[category.name]) {
          const payeesList = PAYEES[category.name];
          payee = payeesList[Math.floor(Math.random() * payeesList.length)];
        } else {
          const allPayees = Object.values(PAYEES).flat();
          payee = allPayees[Math.floor(Math.random() * allPayees.length)];
        }
        
        let amount = 0;
        switch (category.name) {
          case 'Rent/Mortgage':
            amount = Math.floor(Math.random() * 1500) + 1200;
            break;
          case 'Groceries':
            amount = Math.floor(Math.random() * 200) + 80;
            break;
          case 'Dining Out':
            amount = Math.floor(Math.random() * 80) + 15;
            break;
          case 'Shopping':
            amount = Math.floor(Math.random() * 250) + 30;
            break;
          case 'Utilities':
            amount = Math.floor(Math.random() * 150) + 60;
            break;
          case 'Entertainment':
            amount = Math.floor(Math.random() * 60) + 10;
            break;
          case 'Transportation':
            amount = Math.floor(Math.random() * 100) + 20;
            break;
          case 'Healthcare':
            amount = Math.floor(Math.random() * 200) + 30;
            break;
          case 'Travel':
            amount = Math.floor(Math.random() * 500) + 100;
            break;
          case 'Coffee Shops':
            amount = Math.floor(Math.random() * 15) + 4;
            break;
          default:
            amount = Math.floor(Math.random() * 150) + 10;
        }
        
        const randomDate = new Date(sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime()));
        
        await prisma.transaction.create({
          data: {
            amount: amount,
            payee: payee,
            date: randomDate,
            accountId: account.id,
            categoryId: category.id,
          },
        });
        totalTransactions++;
      }
    }

    // Bağlı bankalar oluştur
    const banks = ['Chase', 'Bank of America', 'Wells Fargo'];
    for (const bank of banks) {
      await prisma.connectedBank.create({
        data: {
          userId: user.id,
          accessToken: `access_${Math.random().toString(36).substr(2, 15)}`,
        },
      });
    }

    // Abonelik oluştur
    await prisma.subscriptionFinance.create({
      data: {
        userId: user.id,
        subscriptionId: `sub_${Math.random().toString(36).substr(2, 9)}`,
        status: 'active',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Finance App seeded successfully!',
      user: {
        email: TEST_USER.email,
        password: TEST_USER.password,
        name: TEST_USER.name,
      },
      stats: {
        accounts: accounts.length,
        categories: categories.length,
        transactions: totalTransactions,
      }
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}