package com.klef.dev;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.dev.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // No extra code needed — JpaRepository provides all CRUD methods
}
