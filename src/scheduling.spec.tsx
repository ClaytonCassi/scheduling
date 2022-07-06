import { definindoPrioridade , limiteMaximo, dentroRange } from '../src/scheduling';


 
  let jobMock= [{ "ID": 1, "Description": "Importação de arquivos de fundos", "MaxDate": "2019-11-10 12:00:00", "Estimatetime": 2 },
  { "ID": 2, "Description": "Importação de dados da Base Legada", "MaxDate": "2019-11-11 12:00:00", "Estimatetime": 4 }, 
  { "ID": 3, "Description": "Importação de dados de integração", "MaxDate": "2020-11-11 08:00:00", "Estimatetime": 6 }]
       


describe('Testing scheduling application', () => {

    beforeEach(() => {
        jobMock= [{ "ID": 1, "Description": "Importação de arquivos de fundos", "MaxDate": "2019-11-10 12:00:00", "Estimatetime": 2 },
                  { "ID": 2, "Description": "Importação de dados da Base Legada", "MaxDate": "2019-11-11 12:00:00", "Estimatetime": 4 }, 
                  { "ID": 3, "Description": "Importação de dados de integração", "MaxDate": "2020-11-11 08:00:00", "Estimatetime": 6 }]

      });


    test('validade if job array not exceded to 8hour', () => {

        expect(limiteMaximo(jobMock).some(({Estimatetime}) => Estimatetime < 8)).toBe(true);
       
     
      });

      test('The maximum job completion date must be respected', () => {

        const dateStartMock = new Date('2019-11-10 09:00:00');
        const dateEndMock = new Date('2019-11-11 12:00:00');

        expect(dentroRange(jobMock).some(({MaxDate}) => new Date(MaxDate) >  dateStartMock )).toBe(true);
        expect(dentroRange(jobMock).some(({MaxDate}) => new Date(MaxDate) < dateEndMock )).toBe(true);
       
     
      });

      test('should be respected order of array execution', () => {
        const arrayDefinido = definindoPrioridade(jobMock);
    
        
          expect(arrayDefinido[0].ID).toEqual(1);
          expect(arrayDefinido[1].ID).toEqual(3);
          expect(arrayDefinido[2].ID).toEqual(2);
     
     


       
     
      });

     


});