package org.meghna.admin.service;

import org.meghna.admin.model.Admin;
import org.meghna.admin.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

}
