// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "../node_modules/hardhat/console.sol";

contract TestingEvent {

  event Deposit(
    address indexed _from,
    uint _value
  );

  function deposit() public payable { 
    console.log("deposit function executed");
    emit Deposit(msg.sender, msg.value);
  }

}