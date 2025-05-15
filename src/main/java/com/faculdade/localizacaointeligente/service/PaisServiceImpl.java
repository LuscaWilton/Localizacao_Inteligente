package com.faculdade.localizacaointeligente.service;

import com.faculdade.localizacaointeligente.dto.PreferenciasDTO;
import com.faculdade.localizacaointeligente.model.Pais;
import com.faculdade.localizacaointeligente.repository.PaisRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PaisServiceImpl implements PaisService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PaisRepository paisRepository;

    @Override
    public void atualizarBaseDePaises() {
        try {
            log.info("Iniciando atualização da base de países");
            String url = "https://restcountries.com/v3.1/all";

            ResponseEntity<Pais[]> response = restTemplate.getForEntity(url, Pais[].class);
            Pais[] paisesArray = response.getBody();

            if (paisesArray == null) {
                throw new RuntimeException("Resposta da API está vazia");
            }

            List<Pais> paises = Arrays.asList(paisesArray);
            log.info("Recebidos {} países da API", paises.size());

            paises.forEach(pais -> {
                log.debug("Processando país: {}", pais.getNome());
                pais.processarDadosAPI();
            });

            paisRepository.deleteAll();
            paisRepository.saveAll(paises);
            log.info("Base atualizada com sucesso. Total de países: {}", paises.size());

        } catch (Exception e) {
            log.error("Erro ao atualizar base de países", e);
            throw new RuntimeException("Falha ao atualizar base de países: " + e.getMessage());
        }
    }

    @Override
    public List<Pais> buscarPaisesPorPreferencias(PreferenciasDTO preferencias) {
        List<Pais> todosPaises = paisRepository.findAll();
        log.info("Total de países na base: {}", todosPaises.size());
        log.info("Preferências recebidas: {}", preferencias);

        List<Pais> paisesFiltrados = todosPaises.stream()
                .filter(pais -> {
                    boolean match = true;

                    if (preferencias.getRegiao() != null && !preferencias.getRegiao().isEmpty()) {
                        match = pais.getRegiao() != null && 
                               pais.getRegiao().equalsIgnoreCase(preferencias.getRegiao());
                        log.debug("País: {}, Match região: {}", pais.getNome(), match);
                    }

                    if (match && preferencias.getLingua() != null && !preferencias.getLingua().isEmpty()) {
                        match = pais.getLingua() != null && 
                               pais.getLingua().toLowerCase().contains(preferencias.getLingua().toLowerCase());
                        log.debug("País: {}, Match língua: {}", pais.getNome(), match);
                    }

                    if (match && preferencias.getClima() != null && !preferencias.getClima().isEmpty()) {
                        match = pais.getClima() != null && 
                               pais.getClima().equalsIgnoreCase(preferencias.getClima());
                        log.debug("País: {}, Match clima: {}", pais.getNome(), match);
                    }

                    if (match && preferencias.getMoeda() != null && !preferencias.getMoeda().isEmpty()) {
                        match = pais.getMoeda() != null && 
                               pais.getMoeda().equalsIgnoreCase(preferencias.getMoeda());
                        log.debug("País: {}, Match moeda: {}", pais.getNome(), match);
                    }

                    return match;
                })
                .collect(Collectors.toList());

        log.info("Total de países encontrados após filtro: {}", paisesFiltrados.size());
        return paisesFiltrados;
    }
}