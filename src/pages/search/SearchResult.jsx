import React from 'react'
import './SearchResult.css'
import { Pagination, Table } from 'react-bootstrap'
import Result from '../../components/search/Result'

export default function SearchResult() {
  return (
    <div className='custom-search-result'>
      <Table bordered hover responsive="md">
        <thead>
          <tr>
            <th></th>
            <th className='wide-column'>이름</th>
            <th>좋아요</th>
            <th>BGG 평점</th>
            <th>CAST 평점</th>
          </tr>
        </thead>
        <tbody>
          <Result 
            imageUrl='https://cf.geekdo-images.com/j6iQpZ4XkemZP07HNCODBA__imagepage/img/bbKggiASKA1E8sAh2cH07czaGn4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic394356.jpg'
          />
          <Result 
            id={40834}
            imageUrl='https://cf.geekdo-images.com/OGOmpi0GgwOwH2y28QgkuA__itemrep/img/BUiLGjf1tVpnUsg9WEyRq1HXAL4=/fit-in/246x300/filters:strip_icc()/pic460011.jpg'
            nameKor = '도미니언 : 장막 뒤의 사람들'
            nameEng = 'Dominion:Intrigue'
            yearPublished = {2009}
            liked = {453}
            geekScore = {7.7}
            castScore = {8.0}
          />
          <Result 
            id={66690}
            imageUrl='https://cf.geekdo-images.com/fEawLvevkxPv9AQ3mSiwVQ__itemrep/img/6UJpoKwtjxUm965dI017XMrgGDE=/fit-in/246x300/filters:strip_icc()/pic1747320.jpg'
            nameKor = '도미니언 : 약속된 번영'
            nameEng = 'Dominion:Proserity'
            yearPublished = {2010}
            liked = {789}
            geekScore = {8.2}
            castScore = {8.4}
          />
          <Result />
        </tbody>
      </Table>
      <div className='div-pagination'>
        <Pagination size='lg'>
          <Pagination.First />
          <Pagination.Prev />
          {/* <Pagination.Item>{1}</Pagination.Item> */}
          {/* <Pagination.Ellipsis /> */}

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          {/* <Pagination.Ellipsis /> */}
          {/* <Pagination.Item>{20}</Pagination.Item> */}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  )
}
