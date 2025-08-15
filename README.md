# 📅 Calendário de Giras Festivas – Ritualística Bantu Ameríndio

Este projeto apresenta um calendário interativo com as datas das giras festivas dos orixás, seguindo os princípios da ritualística Bantu Ameríndio e respeitando o sincretismo religioso presente nas celebrações. A proposta é oferecer uma ferramenta visual e acessível para consulta das datas sagradas, cores de velas associadas e entidades cultuadas.

## ✨ Funcionalidades

- Exibição mensal das giras festivas com destaque visual no calendário.
- Busca por nome da celebração com destaque automático da data correspondente.
- Popup informativo ao clicar em uma data festiva, exibindo:
  - Nome da celebração e sincretismo associado.
  - Imagens representando as cores de velas ofertadas à entidade.

## 🧠 Tecnologias utilizadas

- [Bootstrap 5](https://getbootstrap.com/) – para estrutura e responsividade.
- [SweetAlert2](https://sweetalert2.github.io/) – para popups elegantes e interativos.
- `fetch()` do JavaScript – para carregar os dados do arquivo JSON.
- [Google Fonts – Ubuntu](https://fonts.google.com/specimen/Ubuntu) – para tipografia suave e legível.

## 📁 Estrutura de dados

As celebrações são organizadas em um arquivo `giras.json`, contendo:

- `data`: Data da celebração (formato `dd/mm`)
- `celebracao`: Nome da gira e sincretismo
- `cores-velas`: Caminhos para imagens das velas representativas

## 🎨 Visual

O projeto utiliza uma imagem de fundo com sobreposição verde translúcida, criando uma atmosfera espiritual e acolhedora. O layout é responsivo e adaptado para diferentes tamanhos de tela.

## 🙏 Propósito

Mais do que uma ferramenta técnica, este calendário é uma forma de honrar os saberes ancestrais e facilitar o acesso às datas de culto e reverência aos orixás e entidades espirituais.

---
