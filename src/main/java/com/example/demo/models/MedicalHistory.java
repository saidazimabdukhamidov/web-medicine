package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalHistory {
  public int patient_id;
  public String first_name;
  public String last_name;
  public String history;
  public String created_time;
  public String created_by;
}
