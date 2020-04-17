package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
  private Integer patient_id;
  private String first_name;
  private String last_name;
  private String father_name;
  private String address;
  private String birth_date;
  private String phone_number;
}
