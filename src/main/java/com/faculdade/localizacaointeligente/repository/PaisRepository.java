package com.faculdade.localizacaointeligente.repository;

import com.faculdade.localizacaointeligente.model.Pais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaisRepository extends JpaRepository<Pais, Long> {
}