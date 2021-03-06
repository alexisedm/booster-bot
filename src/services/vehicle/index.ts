import axios from 'axios';

const vehiclesAPI = 'https://vpic.nhtsa.dot.gov/api';

const validateVIN = (vin: string) => {
  if (!vin) {
    return false;
  }
  if (vin.length !== 17) {
    return false;
  }
  if (vin.includes('O') || vin.includes('I') || vin.includes('Q')) {
    return false;
  }
  return true;
};

const getVehicleByVIN = async (vin: string) => {
  const { data } = await axios.get(
    `${vehiclesAPI}/vehicles/DecodeVin/${vin}?format=json`
  );
  const { Results } = data;
  const vehicle = Results.filter(
    (obj: { Variable: string }) =>
      obj.Variable === 'Make' ||
      obj.Variable === 'Model' ||
      obj.Variable === 'Model Year' ||
      obj.Variable === 'Fuel Type - Primary' ||
      obj.Variable === 'Fuel Type - Secondary'
  );
  let finalMessage = 'The car details! :car:\n';
  for (const detail of vehicle) {
    finalMessage += `${detail.Variable}: ${detail.Value}\n`;
  }
  return finalMessage;
};

const getModelsForMake = async (make: any) => {
  const { data } = await axios.get(
    `${vehiclesAPI}/vehicles/getmodelsformake/${make}?format=json`
  );
  const { Results } = data;
  let finalMessage = 'There are the models for this make :car:\n';
  Results.map(
    (obj: { Model_Name: any }) => (finalMessage += `${obj.Model_Name}\n`)
  );
  return finalMessage;
};

module.exports = {
  validateVIN,
  getVehicleByVIN,
  getModelsForMake,
};
