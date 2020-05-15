package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
  public int patient_id;
  public String first_name;
  public String last_name;
  public String father_name;
  public String address;
  public String birth_date;
  public String phone_number;
}
