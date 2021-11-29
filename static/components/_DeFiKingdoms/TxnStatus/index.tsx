import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import React, { useMemo } from 'react'
import { Activity } from 'react-feather'
import styled from 'styled-components'
import { NETWORK_CHAIN_ID } from '../../../connectors'
import { NetworkContextName } from '../../../constants'
import { isTransactionRecent, useAllTransactions } from '../../../state/transactions/hooks'
import { TransactionDetails } from '../../../state/transactions/reducer'
import setupNetwork from '../../../utils/setupNetwork'
import getBlockchainName from '../../../utils/getBlockchainName'

import Loader from '../../Loader'

import { RowBetween } from '../../Row'

const TxnStatusGeneric = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0.2rem 0.4rem;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  :focus {
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: .7rem;
  `};
`
const TxnStatusError = styled(TxnStatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
`

const TxnStatusConnected = styled(TxnStatusGeneric)<{ pending?: boolean }>`
  background-color: ${({ pending, theme }) => (pending ? theme.yellow2 : theme.bg2)};
  border: 1px solid ${({ pending, theme }) => (pending ? theme.yellow2 : theme.bg3)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 0.75rem;
  width: fit-content;
  font-weight: 500;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: .7rem;
  `};
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 12px;
    height: 12px;
  `};
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function TxnStatusInner() {
  const { account, error } = useWeb3React()

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)

  const hasPendingTransactions = !!pending.length

  const blockchainName = getBlockchainName(NETWORK_CHAIN_ID)

  if (account && hasPendingTransactions) {
    return (
      <TxnStatusConnected id="web3-status-connected" pending={hasPendingTransactions}>
        <RowBetween>
          <Text>{pending?.length} Pending</Text> <Loader stroke="white" size={'10px'} />
        </RowBetween>
      </TxnStatusConnected>
    )
  } else if (error) {
    return (
      <TxnStatusError onClick={setupNetwork}>
        <NetworkIcon />
        <Text>{error instanceof UnsupportedChainIdError ? `Connect to ${blockchainName}` : 'Error'}</Text>
      </TxnStatusError>
    )
  } else {
    return null
  }
}

export default function TxnStatus() {
  const { active } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  if (!contextNetwork.active && !active) {
    return null
  }

  return <TxnStatusInner />
}
