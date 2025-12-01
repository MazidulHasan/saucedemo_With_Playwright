import xlsx from 'xlsx';

// Login credentials data
const loginData = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        description: 'Valid user with standard access'
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        description: 'User that has been locked out'
    },
    {
        username: 'problem_user',
        password: 'secret_sauce',
        description: 'User with problem/glitchy behavior'
    },
    {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        description: 'User with performance issues'
    },
    {
        username: 'invalid_user',
        password: 'wrong_password',
        description: 'Invalid credentials for negative testing'
    }
];

// Product data for shopping cart tests
const productData = [
    {
        productName: 'Sauce Labs Bolt T-Shirt',
        description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt',
        price: '$15.99'
    },
    {
        productName: 'Sauce Labs Backpack',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack',
        price: '$29.99'
    },
    {
        productName: 'Sauce Labs Bike Light',
        description: 'A red light isn\'t the desired state in testing but it sure helps',
        price: '$9.99'
    },
    {
        productName: 'Sauce Labs Fleece Jacket',
        description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket',
        price: '$49.99'
    },
    {
        productName: 'Sauce Labs Onesie',
        description: 'Rib snap infant onesie for the junior automation engineer in development',
        price: '$7.99'
    },
    {
        productName: 'Test.allTheThings() T-Shirt (Red)',
        description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up',
        price: '$15.99'
    }
];

// Create workbook
const workbook = xlsx.utils.book_new();

// Create LoginCredentials worksheet
const loginWorksheet = xlsx.utils.json_to_sheet(loginData);
xlsx.utils.book_append_sheet(workbook, loginWorksheet, 'LoginCredentials');

// Create Products worksheet
const productWorksheet = xlsx.utils.json_to_sheet(productData);
xlsx.utils.book_append_sheet(workbook, productWorksheet, 'Products');

// Write to file
xlsx.writeFile(workbook, 'utils/testData.xlsx');

console.log('✅ Excel test data file created successfully with 2 sheets:');
console.log('   - LoginCredentials (5 users)');
console.log('   - Products (6 products)');
console.log('   Location: utils/testData.xlsx');
