package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
  Integer doctor_id;
  String first_name;
  String last_name;
  String passport_number;
  String profession;
  String address;
}
