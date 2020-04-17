package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalHistory {
  Integer patient_id;
  String full_name;
  String history;
  String created_time;
  String created_by;
}
