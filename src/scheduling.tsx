
import React from 'react';

interface IJobs {
  ID: number;
  Description: string;
  MaxDate: string;
  Estimatetime: number;
}
  //Definindo array de listagem dos Jobs. Pode vir de um serviço externo
const job=   [{ "ID": 1, "Description": "Importação de arquivos de fundos", "MaxDate": "2019-11-10 12:00:00", "Estimatetime": 2 },
            { "ID": 2, "Description": "Importação de dados da Base Legada", "MaxDate": "2019-11-11 12:00:00", "Estimatetime": 4 }, 
            { "ID": 3, "Description": "Importação de dados de integração", "MaxDate": "2019-11-11 08:00:00", "Estimatetime": 6 }]

export const Dashboard: React.FC = () => {

  //Definindo array de listagem dos Jobs.
 
 // 2) Cada array deve conter jobs que sejam executados em, no máximo, 8h;
const executionJobs = limiteMaximo(job);

//3) Deve ser respeitada a data máxima de conclusão do Job;
const limite = dentroRange(executionJobs)

// validando se a datamaxima menos a data estimada ainda está dentro do range de execução do job.
const dataMaximaMenosEstimado = dataRealExecucao(limite)

const Registro = definindoPrioridade(dataMaximaMenosEstimado);

//1) Cada array do conjunto representa uma lista de Jobs a serem executados em sequência;
console.log(Registro);


 return (
 <><h1>
 
     {Registro[0].ID}
    
   </h1>
   <h1>

     {Registro[1].ID}
    
     </h1>
   <h1>

     {Registro[2].ID}

   </h1>


  
    </>

 );
}

export function definindoPrioridade(job: Array<IJobs>): Array<IJobs>{

 
  var copiaJob = [...job];  

  const  arrayDeJobsAtualizado =  copiaJob.sort(function(a, b) {
            return new Date(a.MaxDate).getTime() - new Date(b.MaxDate).getTime()
          });

  
return arrayDeJobsAtualizado;
}



export function dataRealExecucao(job: Array<IJobs>): Array<IJobs>{
  
  const dataRealExecucao= job.map((item) => {
       let dataAtualizada = new Date(item.MaxDate);
    
       dataAtualizada.setHours(dataAtualizada.getHours() - item.Estimatetime);

       item.MaxDate = dataAtualizada.toString();
      
     
        
      return item;
     
   
   
  });

  return dataRealExecucao;
}
export function dentroRange(job: Array<IJobs>): Array<IJobs> {
  const dateStart = new Date('2019-11-10 09:00:00');
  const dateEnd = new Date('2019-11-11 12:00:00');



  return job.filter((item) => {
      const datamaxima = new Date(item.MaxDate);

      return (datamaxima >= dateStart && datamaxima <= dateEnd ); 
     
   });

  
  }

export function limiteMaximo(job: Array<IJobs>) {
   //regra de negocio  - >  Cada array deve conter jobs que sejam executados em, no máximo, 8h;
   let limite = job.filter((item) =>{
     return (item.Estimatetime < 8 );

    
   })
   return limite;
 

}

