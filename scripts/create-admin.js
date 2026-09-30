const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔐 Создание администратора для Кабардинских головных уборов\n');

rl.question('Введите email админа: ', (email) => {
  rl.question('Введите пароль: ', async (password) => {
    const hash = await bcrypt.hash(password, 10);

    console.log('\n✅ SQL запрос для Supabase:\n');
    console.log('───────────────────────────────────────────────────────\n');
    console.log(`INSERT INTO users (email, password_hash, role)`);
    console.log(`VALUES (`);
    console.log(`  '${email}',`);
    console.log(`  '${hash}',`);
    console.log(`  'admin'`);
    console.log(`);\n`);
    console.log('───────────────────────────────────────────────────────\n');
    console.log('Скопируйте этот запрос и выполните в SQL Editor Supabase\n');

    rl.close();
  });
});
