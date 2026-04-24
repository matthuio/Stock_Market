"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import Chart from '@/components/Chart'
import List from '@/components/List'
import ClickableList from '@/components/ClickableList'
import { fetchStocks } from '@/Models/StockModel'
import { fetchUsers } from '@/Models/UserModel'

const ChartSection = () => {
  const [stocks,setStocks] = useState<any[]>([])
  const [users,setUsers] = useState<any[]>([])

  useEffect(()=>
  {
    const run = async ()=>
    {   
      const data = await fetchStocks()
      setStocks(data)
      const userData = await fetchUsers()
      setUsers(userData)
      console.log(users)
      console.log(stocks)
    }
    run()
  }
    ,[]
  )
  return (
    <main className='py-30'>
      {stocks && stocks.length != 0 && (
        <Chart ticker = {'RCK'}>

        </Chart>
      )}

        <div className='flex py-30'>
          <List lists={users}>
          </List>
          {stocks && stocks.length != 0 && (
          <ClickableList lists={stocks}>

          </ClickableList>
          )
          }
        </div>
        

    </main>

  )
}

export default ChartSection