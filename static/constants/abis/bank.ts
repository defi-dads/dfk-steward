import { Interface } from '@ethersproject/abi'
import BANK_ABI from './Bank.json'

const BANK_INTERFACE = new Interface(BANK_ABI)

export default BANK_INTERFACE
export { BANK_ABI, BANK_INTERFACE }
