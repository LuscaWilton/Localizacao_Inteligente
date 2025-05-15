package com.faculdade.localizacaointeligente.controller;

import com.faculdade.localizacaointeligente.service.PaisService;
import com.faculdade.localizacaointeligente.dto.PreferenciasDTO;
import com.faculdade.localizacaointeligente.model.Pais;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Collections;

@Slf4j
@RestController
@RequestMapping("/api/paises")
@CrossOrigin(origins = "*")
public class PaisController {

    @Autowired
    private PaisService paisService;

    @PostMapping("/atualizar-base")
    public ResponseEntity<?> atualizarBaseDePaises() {
        try {
            log.info("Iniciando atualização da base de países");
            paisService.atualizarBaseDePaises();
            log.info("Base de países atualizada com sucesso");
            return ResponseEntity.ok("Base de países atualizada com sucesso");
        } catch (Exception e) {
            log.error("Erro ao atualizar base de países: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar base de países: " + e.getMessage());
        }
    }

    @PostMapping("/buscar")
    public ResponseEntity<List<Pais>> buscarPaisesPorPreferencias(@RequestBody PreferenciasDTO preferencias) {
        try {
            log.info("Recebendo requisição de busca com preferências: {}", preferencias);
            List<Pais> paises = paisService.buscarPaisesPorPreferencias(preferencias);
            
            if (paises.isEmpty()) {
                log.info("Nenhum país encontrado para as preferências informadas");
                return ResponseEntity.ok(Collections.emptyList());
            }
            
            log.info("Encontrados {} países", paises.size());
            return ResponseEntity.ok(paises);
        } catch (Exception e) {
            log.error("Erro ao buscar países", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}