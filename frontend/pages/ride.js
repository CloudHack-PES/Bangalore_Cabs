
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const Database = process.env.DATABASE || "localhost";

export default function Ride({data}) {
    console.log(data);
    return <TableContainer m="10vw" overflowY="auto" h="65vh">
    <Table variant='simple'>
      <TableCaption>All The Ride Request In The Database</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Pickup</Th>
          <Th>Destination</Th>
          <Th>Seats</Th>
          <Th isNumeric>Cost</Th>
          <Th isNumeric>Time</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((ride)=>{
       return (
       <Tr>
          <Td>{ride.name}</Td>
          <Td>{ride.pickup}</Td>
          <Td>{ride.destination}</Td>
          <Td>{ride.seats}</Td>
          <Td isNumeric>{ride.cost}</Td>
          <Td isNumeric>{ride.time}</Td>
        </Tr>
     );})}
    </Tbody>
    </Table>
  </TableContainer>;
  }

    export async function getServerSideProps(context) {
        const res = await fetch("http://"+Database+":4000/ride");
        const data = await res.json();
        return { props: { data } };
    }