package com.faculdade.localizacaointeligente.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Entity
@Data
@Slf4j
@JsonIgnoreProperties(ignoreUnknown = true)
public class Pais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "regiao")
    private String regiao;

    @Column(name = "lingua")
    private String lingua;

    @Column(name = "clima")
    private String clima;

    @Column(name = "moeda")
    private String moeda;

    @Transient
    private Map<String, Object> name;

    @Transient
    private Map<String, Object> currencies;

    @Transient
    private Map<String, String> languages;

    @Transient
    private String region;

    public void processarDadosAPI() {
        log.info("Iniciando processamento dos dados da API");

        try {
            // Processa o nome
            if (name != null && name.containsKey("common")) {
                this.nome = (String) name.get("common");
                log.debug("Nome definido: {}", this.nome);
            } else {
                log.warn("Nome não encontrado para o país");
            }

            // Processa a região
            if (this.region != null) {
                this.regiao = this.region;
                log.debug("Região definida: {}", this.regiao);
            } else {
                log.warn("Região não encontrada para o país: {}", this.nome);
            }

            // Processa a moeda
            if (currencies != null && !currencies.isEmpty()) {
                Map.Entry<String, Object> entry = currencies.entrySet().iterator().next();
                this.moeda = entry.getKey();
                log.debug("Moeda definida: {}", this.moeda);
            } else {
                log.warn("Moeda não encontrada para o país: {}", this.nome);
            }

            // Processa o idioma
            if (languages != null && !languages.isEmpty()) {
                this.lingua = languages.values().iterator().next();
                log.debug("Língua definida: {}", this.lingua);
            } else {
                log.warn("Língua não encontrada para o país: {}", this.nome);
            }

            // Define o clima
            this.clima = determinarClimaBasico(this.regiao);
            log.debug("Clima definido: {}", this.clima);

        } catch (Exception e) {
            log.error("Erro ao processar dados do país {}: {}", this.nome, e.getMessage());
        }

        log.info("Processamento concluído para o país: {}", this.nome);
    }

    private String determinarClimaBasico(String regiao) {
        if (regiao == null) {
            return "Desconhecido";
        }

        switch (regiao.toLowerCase()) {
            case "americas":
                return "Tropical";
            case "europe":
                return "Temperado";
            case "asia":
                return "Continental";
            case "africa":
                return "Tropical";
            case "oceania":
                return "Tropical";
            default:
                return "Variado";
        }
    }

    @Override
    public String toString() {
        return "Pais{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", regiao='" + regiao + '\'' +
                ", lingua='" + lingua + '\'' +
                ", clima='" + clima + '\'' +
                ", moeda='" + moeda + '\'' +
                '}';
    }
}