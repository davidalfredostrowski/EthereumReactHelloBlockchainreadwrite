import React, {Component} from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';
//import votingArtifact from "../../build/contracts/Voting.json";
//1.) start ganache (include new DNS)
//2.) update truffle-config wtih dns
//2.) deploy contract
//3.) copy over new Voting
//4.) update DNS in DAPP
//5.) npm start

class SimpleStorage extends Component {

    componentWillMount(){
         this.loadBlockchainData()
    }
 
    async loadBlockchainData(){
         const web3 = new Web3(window.web3.currentProvider);
         //. if (!web3.currentProvider){
         // works!!!!!        const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-35-87-194-231.us-west-2.compute.amazonaws.com:8545"))
         // }//
	 this.setState( { web3 } )
         var account;
         const accounts  = await web3.eth.getAccounts()
	 console.log(accounts)
	     web3.eth.getAccounts().then((f) => {
             account = f[0];
         })
	 console.log("account")
	 console.log(account)
	 console.log(accounts[0])

         //just copy the json file to the src directory
         const networkId = await web3.eth.net.getId();
         console.log(networkId);
         // const deployedNetwork = votingArtifact.networks[networkId];
	 this.setState( { account : accounts[0] }) 
	 console.log(account);
         let jsonData = require('./SimpleStorage.json');
         var networkKey =  Object.keys(jsonData['networks'])[Object.keys(jsonData.networks).length-1] 
         console.log(networkKey)	
         console.log(jsonData['networks'][networkKey]["address"] )
         console.log("get ID based solution")
         console.log(networkId)
         // error ? copy over the updated Voting.json from bulid/contract
         console.log(jsonData['networks'][networkId]["address"] )
         //const contract = new web3.eth.Contract(VOTING_ABI);
         const contract = new web3.eth.Contract(jsonData.abi); 
         contract.options.address = jsonData['networks'][networkId]["address"]
         this.setState( { contract }) 
	}

  constructor(props){
	  	super(props)
		console.log("constructor")
	  	this.state = {
			account: '',
			loading: true,
			message: ''
			//data: todoList   // new portion
		}
  }

	setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
		this.state.contract.methods.set(event.target.setText.value).send({ from: this.state.account });
	}

	 getCurrentVal = async () => {
		 let val = await this.state.contract.methods.get().call(console.log);
        this.setState( { message : val })
// not good		 console.log(val)
	 	}
	
render(){	

	return (
		<div>

		<h5>message output: {this.state.message}</h5>
	
		<h5>contract number: { this.state.contacts.options.address }</h5>

		<h4> {"Get/Set Contract interaction"} </h4>
			<form onSubmit={this.setHandler}>
				<input id="setText" type="text"/>
				<button type={"submit"}> Update Contract </button>
			</form>
			<div>
			<button onClick={this.getCurrentVal} style={{marginTop: '5em'}}> Get Current Contract Value </button>
			</div>
                        <div>
                        <button onClick={this.connWallet} style={{marginTop: '5em'}}> ConnectToWallet </button>
                        </div>




		</div>
	);
}
}
export default SimpleStorage;
