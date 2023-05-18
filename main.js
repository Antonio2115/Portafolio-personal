//Funcion de despliegue de navbar mobile
let links = document.querySelector('.links');
let menuNavBackGround = document.querySelector('.menuBackground');
let projectDetailMenuBackground = document.querySelector('.projectDetailMenuBackground');

if(menuNavBackGround.classList.contains('disable')){
  menuNavBackGround.addEventListener('click',responsiveMenuMobile);
}

function responsiveMenuMobile(){
  links.classList.toggle('disable');
  links.classList.toggle('active');

  menuNavBackGround.classList.toggle('disable');
}

function closedResponsiveMenuMobile(){
  const IsOpenMenuMobile = links.classList.contains('active');
  if(IsOpenMenuMobile){
    links.classList.remove('active');
    links.classList.add('disable');
  }
  menuNavBackGround.classList.add('disable');
}
//<-------------------------------Lista de funcionamiento-------------------------->

//Cada vez que se redimensiona la pagina se cierra la ventana del navbar
window.onresize = closedResponsiveMenuMobile; 

function renderProjects(project){
  let templateProjectsSelector = document.querySelector('#templateProjects');
  let templateProjects = templateProjectsSelector.content.cloneNode(true);
  let imgProject = templateProjects.querySelector('img');
  let projectTitle = templateProjects.querySelector('.projectTitle');
  let categoryProject = templateProjects.querySelector('.category');
  let projectContainer = templateProjects.querySelector('.project');

  projectContainer.addEventListener('click', function(){projectDetail(project)});

  imgProject.setAttribute('src',project.images[0]);
  projectTitle.innerText = project.name;
  categoryProject.innerText = project.category;
  //Agregacion de cada proyecto
  projectsContainer.appendChild(templateProjects);
}

//Despliegue de detalles de proyecto
function projectDetail(project){
  let projectDetail = document.querySelector('#projectDetail');
  let sectionTitle = document.querySelector('#detailProjectTitle');
  let descriptionProject = document.querySelector('#detailProjectDescription');
  let documentationLink = document.querySelector('#DocumentationLink');
  let toolsContainer = document.querySelector('.usedToolsContainerInProjectdetails');
  let closedContainer = document.querySelector('.closeContainer');
  let projectDetailsContainer = document.querySelector('.projectDetailsContainer');


  //Apareción de aside
  projectDetail.classList.toggle('disable');
  projectDetail.classList.add('active');
  projectDetailMenuBackground.classList.remove('disable');

  
  //Cambio de datos de ventana de detalles de proyectos
  sectionTitle.innerText = project.name;
  descriptionProject.innerText = project.description;

  //Mapeo de lista de actividades hechas
  project.toolsUsed.map(tool => {
    let toolList = document.createElement('li');
    toolList.classList.add('list');
    toolList.innerText = tool;
    toolsContainer.appendChild(toolList);
  });

  //Integrar Disable
  if(project.documentation === ''){
    documentationLink.classList.remove('primaryButton');
  }else{
    documentationLink.classList.add('primaryButton');
    documentationLink.setAttribute('href',project.documentation)
  }
  
  
  //Cerrado de ventana de detalles del proyecto
  closedContainer.addEventListener('click',closeForX);
  projectDetailMenuBackground.addEventListener('click',closeForBackground);
  projectDetailsContainer.addEventListener('click',clickProjectDetailContainer);

  function closeForBackground(){
    closedProjectDetail();
  }
  function closeForX(event){
    event.stopPropagation();
    closedProjectDetail()
  }
  function clickProjectDetailContainer(event){
    event.stopPropagation();
  }
  

  function closedProjectDetail() {
    projectDetail.classList.add('disable');
    projectDetail.classList.remove('active');
    projectDetailMenuBackground.classList.add('disable');
    //Limpieza de componentes
    project.toolsUsed.map(() => {
      let toolsList = document.querySelector('.list');
      if(toolsList){
        toolsList.remove();
      }
    });
  }
}

//Generación de etiquetas de proyectos
let projectsContainer = document.querySelector('.projectsContainer');
projects.forEach(ArrayProject => {
  renderProjects(ArrayProject);
});