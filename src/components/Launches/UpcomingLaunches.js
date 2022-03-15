import {useQuery} from 'react-query';
import axios from 'axios';
import { Table, TD,TH, Title,Observacao } from './styles';

const url = process.env.NODE_ENV==='production'? process.env.REACT_APP_API_URL: 'http://localhost:8000';

export function UpcomingLaunches() {
  const {data,isFetching} = useQuery('proximosLancamentos',async()=>{
    const response = await axios.get(url+'/proximosLancamentos');
    return response.data;
  },{
    staleTime: 60000 // 1 minuto
  });

  return (
    <>
    <Title>Próximos Lançamentos</Title>
    <Observacao>(em ordem crescente por data)</Observacao>
    <Table>
      <thead>
        <tr>
          <TH>Nome</TH>
          <TH>Data</TH>
        </tr>
        {isFetching&&<p>Carregando...</p>}
        {data?.map(launch=>{
          return (
            <tr>
              <TD>{launch.name}</TD>
              <TD>{launch.date_local}</TD>
              </tr>
              )
            })}
      </thead>
    </Table>
    </>
)
}