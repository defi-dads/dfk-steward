import { Interface } from '@ethersproject/abi'
import GOVERNANCE_TOKEN_ABI from './JewelToken.json'

const GOVERNANCE_TOKEN_INTERFACE = new Interface(GOVERNANCE_TOKEN_ABI)

export default GOVERNANCE_TOKEN_INTERFACE
export { GOVERNANCE_TOKEN_ABI, GOVERNANCE_TOKEN_INTERFACE }
