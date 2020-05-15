package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
  public int doctor_id;
  public String first_name;
  public String last_name;
  public String passport_number;
  public String profession;
  public String address;
}
