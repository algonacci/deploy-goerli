// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecordContract {
    struct MedicalRecord {
        uint256 id;
        string patientName;
        string diagnosis;
        string treatment;
    }


    MedicalRecord[] public medicalRecords;
    uint256 public recordCounter;

    constructor() {
        recordCounter = 1;
    }

    function createMedicalRecord(string memory _patientName, string memory _diagnosis, string memory _treatment) public {
        MedicalRecord memory newRecord = MedicalRecord({
            id: recordCounter,
            patientName: _patientName,
            diagnosis: _diagnosis,
            treatment: _treatment
        });

        medicalRecords.push(newRecord);
        recordCounter++;
    }

    function getTotalMedicalRecords() public view returns (uint256) {
        return medicalRecords.length;
    }

    function getAllMedicalRecords() public view returns (MedicalRecord[] memory) {
    return medicalRecords;
}

    function getMedicalRecord(uint256 _id) public view returns (
        uint256 id,
        string memory patientName,
        string memory diagnosis,
        string memory treatment
    ) {
        require(_id > 0 && _id <= medicalRecords.length, "Invalid record ID");
        
        MedicalRecord memory record = medicalRecords[_id - 1];
        return (record.id, record.patientName, record.diagnosis, record.treatment);
    }

    function updateMedicalRecord(uint256 _id, string memory _diagnosis, string memory _treatment) public {
        require(_id > 0 && _id <= medicalRecords.length, "Invalid record ID");

        MedicalRecord storage record = medicalRecords[_id - 1];
        record.diagnosis = _diagnosis;
        record.treatment = _treatment;
    }

    function deleteMedicalRecord(uint256 _id) public {
        require(_id > 0 && _id <= medicalRecords.length, "Invalid record ID");

        delete medicalRecords[_id - 1];
    }
}
