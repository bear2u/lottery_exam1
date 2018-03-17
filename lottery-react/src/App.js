import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  //생성
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    ////기본으로 mathmesk 유저로 세팅됨
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });

  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({
        message: '전송되고 있습니다.자~암~시~만 기다려주세요...'
    });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({
      message: '베팅 하였습니다.'
    });
  }

  onClick = async () => {
      const accounts = await web3.eth.getAccounts();

      this.setState({ message: '전송되고 있습니다.자~암~시~만 기다려주세요...' })

      await lottery.methods.pickWinner().send({
        from: accounts[0]
      })

      this.setState({
        message: '승리자가 선택되었습니다.'
      })
  };

  render() {
    return (
      <div style={ { marginLeft:"100px" } } >
        <h2>복권 예제</h2>
        <p>
          이 복권의 관리자는 {this.state.manager} 입니다. <br/>
          현재  {this.state.players.length} 명이 베팅하였습니다.,<br/>
          현재 베팅 금액은 {web3.utils.fromWei(this.state.balance)} ether 입니다.
        </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>대박 나고 싶으신가요?</h4>
          <div>
            <label>이더를 베팅해주세요.</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>베팅시작</button>
        </form>

        <hr />

        <h4>우승자를 선택하기</h4>
        <button onClick={this.onClick}>우승자 선택</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
