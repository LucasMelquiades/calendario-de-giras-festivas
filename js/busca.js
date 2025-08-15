
  let mesAtual = new Date().getMonth();
  let anoAtual = new Date().getFullYear();
  let celebracoes = [];

  function gerarCalendario(mes, ano) {
    const tbody = document.querySelector('#calendario tbody');
    const spanMes = document.getElementById('mes-atual');
    tbody.innerHTML = '';

    const nomeMes = new Date(ano, mes).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    spanMes.textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    let diaSemana = primeiroDia.getDay();

    let linha = document.createElement('tr');

    for (let i = 0; i < diaSemana; i++) {
      linha.appendChild(document.createElement('td'));
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const td = document.createElement('td');
      td.textContent = dia;

      const dataFormatada = `${String(dia).padStart(2, '0')}/${String(mes + 1).padStart(2, '0')}`;
      const celebracao = celebracoes.find(c => c.data === dataFormatada);
      if (celebracao) {
        td.classList.add('celebracao');
        td.title = celebracao.celebracao;
      }

      linha.appendChild(td);
      diaSemana++;

      if (diaSemana > 6) {
        tbody.appendChild(linha);
        linha = document.createElement('tr');
        diaSemana = 0;
      }
    }

    if (linha.children.length > 0) {
    tbody.appendChild(linha);
    }
    adicionarEventosCelebracao(); 
  }

  function adicionarEventosCelebracao() {
  const tds = document.querySelectorAll('#calendario td.celebracao');
  tds.forEach(td => {
    td.addEventListener('click', () => {
      const dia = td.textContent.padStart(2, '0');
      const mes = String(mesAtual + 1).padStart(2, '0');
      const dataFormatada = `${dia}/${mes}`;
      const celebracao = celebracoes.find(c => c.data === dataFormatada);

      if (celebracao) {
        const imagensHTML = celebracao["cores-velas"]
          .map(src => `<img src="${src}" alt="Vela" style="width:80px; margin:5px;">`)
          .join('');

        Swal.fire({
          title: celebracao.celebracao,
          html: `
            <div style="margin-bottom:10px;">${imagensHTML}</div>
            <p><strong>Data:</strong> ${celebracao.data}</p>
            <p><strong>Gira Festiva:</strong> ${celebracao.celebracao}</p>
          `,
          confirmButtonText: 'Fechar',
          background: '#fffbe6',
          color: '#333',
        });
      }
    });
  });
}



document.getElementById('busca-celebracao').addEventListener('input', function () {
  const termo = this.value.toLowerCase();
  const resultado = celebracoes.find(c => c.celebracao.toLowerCase().includes(termo));

  if (resultado) {
    const [dia, mes] = resultado.data.split('/');
    const novoMes = parseInt(mes) - 1;
    const novoAno = anoAtual; 

    trocarMes(novoMes, novoAno);

    setTimeout(() => {
      const tds = document.querySelectorAll('#calendario td');
      tds.forEach(td => td.classList.remove('destaque'));

      const td = Array.from(tds).find(cell => cell.textContent === String(parseInt(dia)));
      if (td) td.classList.add('destaque');
    }, 450); // espera a animação terminar
  }
});

function trocarMes(novoMes, novoAno) {
  const tbody = document.querySelector('#calendario tbody');
  tbody.classList.add('fade-out');

  setTimeout(() => {
    mesAtual = novoMes;
    anoAtual = novoAno;
    gerarCalendario(mesAtual, anoAtual);
    tbody.classList.remove('fade-out');
  }, 400); // tempo igual ao da transição
}

document.getElementById('mes-anterior').addEventListener('click', () => {
  let novoMes = mesAtual - 1;
  let novoAno = anoAtual;
  if (novoMes < 0) {
    novoMes = 11;
    novoAno--;
  }
  trocarMes(novoMes, novoAno);
});

document.getElementById('mes-proximo').addEventListener('click', () => {
  let novoMes = mesAtual + 1;
  let novoAno = anoAtual;
  if (novoMes > 11) {
    novoMes = 0;
    novoAno++;
  }
  trocarMes(novoMes, novoAno);
});


  // Navegação
  document.getElementById('mes-anterior').addEventListener('click', () => {
    mesAtual--;
    if (mesAtual < 0) {
      mesAtual = 11;
      anoAtual--;
    }
    gerarCalendario(mesAtual, anoAtual);
  });

  document.getElementById('mes-proximo').addEventListener('click', () => {
    mesAtual++;
    if (mesAtual > 11) {
      mesAtual = 0;
      anoAtual++;
    }
    gerarCalendario(mesAtual, anoAtual);
  });

  // Carrega JSON e inicia calendário
  fetch('js/giras.json')
    .then(res => res.json())
    .then(data => {
      celebracoes = data;
      gerarCalendario(mesAtual, anoAtual);
    })
    .catch(err => console.error('Erro ao carregar giras.json:', err));
