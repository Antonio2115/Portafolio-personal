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

//Generación de etiquetas de proyectos
let projectsContainer = document.querySelector('.projectsContainer');
projects.forEach(ArrayProject => {
  renderProjects(ArrayProject);
});


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
  let projectDetailContainer = document.querySelector('#projectDetail');
  let sectionTitle = document.querySelector('#detailProjectTitle');
  let descriptionProject = document.querySelector('#detailProjectDescription');
  let documentationLink = document.querySelector('#DocumentationLink');
  let toolsContainer = document.querySelector('.usedToolsContainerInProjectdetails');
  let closedContainer = document.querySelector('.closeContainer');
  //Apareción de aside
  projectDetailContainer.classList.toggle('disable');
  projectDetailMenuBackground.classList.remove('disable');
  
  //Cambio de datos de ventana de detalles de proyectos
  sectionTitle.innerText = project.name;
  descriptionProject.innerText = project.description;

  project.toolsUsed.map(tool => {
    let toolList = document.createElement('li');
    toolList.classList.add('list');
    toolList.innerText = tool;
    toolsContainer.appendChild(toolList);
    console.log(tool);
  });

  //Integrar Disable
  if(project.documentation === ''){
    documentationLink.classList.remove('primaryButton');
  }else{
    documentationLink.classList.add('primaryButton');
    documentationLink.setAttribute('href',project.documentation)
  }
  
  
  //Cerrado de ventana de detalles del proyecto
  closedContainer.addEventListener('click',closedProjectDetail);

  function closedProjectDetail() {
    projectDetailContainer.classList.add('disable');
    projectDetailMenuBackground.classList.add('disable');
    //Limpieza de componentes
    project.toolsUsed.map(() => {
      let toolsList = document.querySelector('.list');
      toolsList.remove();
    });
  }

}
//Funcion de despligue de detalles 

//Construccion de template

let projectbox = document.querySelector('.project');

projectbox.addEventListener('click',detailProjectTest);
function detailProjectTest(){

}

//Cada vez que se redimensiona la pafina se cierra la ventana del nav
window.onresize = closedResponsiveMenuMobile; 