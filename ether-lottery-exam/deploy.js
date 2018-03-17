const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'flush stomach off reason stick slot tribe kidney ugly sad duck unveil',
  'https://rinkeby.infura.io/v2rZTw2EJBYW3JR626oC' //from Infura
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(interface);	
  console.log('Contract deployed to', result.options.address);
};
deploy();
