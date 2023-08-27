const express = require("express");
const { ethers } = require("ethers");

const app = express();
const provider = new ethers.providers.JsonRpcProvider("https://goerli.blockpi.network/v1/rpc/public");
const contractABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      { internalType: "string", name: "_patientName", type: "string" },
      { internalType: "string", name: "_diagnosis", type: "string" },
      { internalType: "string", name: "_treatment", type: "string" },
    ],
    name: "createMedicalRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }], name: "deleteMedicalRecord", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "getAllMedicalRecords",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "patientName", type: "string" },
          { internalType: "string", name: "diagnosis", type: "string" },
          { internalType: "string", name: "treatment", type: "string" },
        ],
        internalType: "struct MedicalRecordContract.MedicalRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "getMedicalRecord",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "patientName", type: "string" },
      { internalType: "string", name: "diagnosis", type: "string" },
      { internalType: "string", name: "treatment", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "getTotalMedicalRecords", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "medicalRecords",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "patientName", type: "string" },
      { internalType: "string", name: "diagnosis", type: "string" },
      { internalType: "string", name: "treatment", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "recordCounter", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "string", name: "_diagnosis", type: "string" },
      { internalType: "string", name: "_treatment", type: "string" },
    ],
    name: "updateMedicalRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Replace with your deployed contract address
const contractAddress = "0x4B05D77cc069F852b3ad5eCF5D756D8a112aff73";

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Define endpoint to query medical records
app.get("/contract/medrec/:id", async (req, res) => {
  const recordId = req.params.id;

  try {
    const record = await contract.getMedicalRecord(recordId);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving medical record" });
  }
});

// Define endpoint to get all medical records
app.get("/contract/medrec", async (req, res) => {
  try {
    const allRecords = await contract.getAllMedicalRecords();
    res.json(allRecords);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/contract/medrec/create", async (req, res) => {
  const { patientName, diagnosis, treatment } = req.body;

  try {
    await contract.createMedicalRecord(patientName, diagnosis, treatment);
    res.status(200).json({ message: "Medical record created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating medical record" });
  }
});

app.put("/contract/medrec/update/:id", async (req, res) => {
  const recordId = req.params.id;
  const { diagnosis, treatment } = req.body;

  try {
    await contract.updateMedicalRecord(recordId, diagnosis, treatment);
    res.status(200).json({ message: "Medical record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating medical record" });
  }
});

app.delete("/contract/medrec/delete/:id", async (req, res) => {
  const recordId = req.params.id;

  try {
    await contract.deleteMedicalRecord(recordId);
    res.status(200).json({ message: "Medical record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting medical record" });
  }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
