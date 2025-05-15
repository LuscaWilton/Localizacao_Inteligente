package com.faculdade.localizacaointeligente.dto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PaisAPIDTO {
    private Map<String, String> name;
    private String region;
    private Map<String, CurrencyDTO> currencies;
    private Map<String, String> languages;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CurrencyDTO {
        private String name;
        private String symbol;
    }
}