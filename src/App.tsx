/* Página do Notion sobre a resolução: https://iwprogramacao.notion.site/Resolu-o-Desafio-02-ReactJS-3d25799bf0134937b1a951620ee2b265

Para resolvermos esse exercício, devemos pensar no compartilhamento de estados entre os componentes, pois quando setamos eles nos diferentes arquivos, cada um terá um estado próprio, e isso faz com que, ao selecionar algum campo com um ID que seria necessário para o campo do 'content' identificar, o 'content' irá exibir o seu próprio estado de ID.
Existem alguns métodos que agilizam esse processo, porém para resolvermos esse problema, utilizaremos o 'LEVANTAMENTO DE ESTADO' (Elevando o State)

  "Devemos elevar o state compartilhado ao elemento pai comum mais próximo"

O pai comum mais próximo da 'SideBar' e o 'Content' é o próprio 'App'
Moveremos os estados por meio de propriedades.

1) Mover os HTMLs correspondentes de cada componente para o seu devido arquivo;

2) Todos os estados estão no elemento 'pai' nativamente com o exemplo,
isso implica na aplicação que nesse momento eles estão compartilhados, 
então precisamos enviar para os filhos neste ponto;

3) Podemos identificar nos dois diretórios que o estado que rege as mudanças é o selectedGenre, então devemos focar nele.

4) Os itens referentes ao movies irão para o 'Content' e criaremos as devidas importações (ver passo 4 no Notion).
Nesse momento,teremos erros, pois o state 'selectedGenre' e 'selectedGenreId' não existem em 'Content'

5) Para passar um state ao component, criaremos uma interface dentro do component tipando o state e desestruturaremos o state passando o tipo pra ele, logo devemos no arquivo pai e enviar as propriedades e seus valores sendo os states que queremos enviar ao component;

6) Agora na SideBar, iremos enviar os itens proprietários que fazem com que ela funcione (mudanças disponíveis no Notion)

7) Precisamos enviar dados para a SideBar, pois ele precisa receber o 'handleClickButton' e o 'selected={selectedGenreId}'

Tip: Por quê não enviar a function handleClickButton para a 'SideBar'?
  Pois dessa forma, não teríamos acesso ao setSelectedGenreId, funcionalidade responsável para dar um novo valor ao state a qual ela é responsável ('selectedGenre')

8) Desestruturaremos os dados na SideBar e enviaremos os dados pelo App, e criaremos uma interface na 'SideBar' para receber a tipagem da 'function handle' e do 'selectedGenreId'
*/

import { useEffect, useState } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <SideBar handleClickButton={handleClickButton} selectedGenreId={selectedGenreId} />
      <Content selectedGenreId={selectedGenreId} />

    </div>
  )
}
