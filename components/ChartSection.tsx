import React from 'react'
import Chart from '@/components/Chart'
import List from '@/components/List'
import ClickableList from '@/components/ClickableList'
import {users} from "@/data/userMoney"

const ChartSection = () => {
  return (
    <main className='py-30'>
        <Chart ticker = "RCK - Rick Grimes">

        </Chart>
        <div className='flex'>
          <List lists={users}>
          </List>
          <ClickableList lists={users}>

          </ClickableList>
        </div>
        

    </main>

  )
}

export default ChartSection