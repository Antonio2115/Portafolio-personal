//Funcion de despliegue de navbar mobile
let links = document.querySelector('.links');
function responsiveMenuMobile(){
  links.classList.toggle('disable');
  links.classList.toggle('active');
}
function closedResponsiveMenuMobile(){
  const IsOpenMenuMobile = links.classList.contains('active');
  if(IsOpenMenuMobile){
    links.classList.remove('active');
    links.classList.add('disable');
  }
    
}

//Generación de etiquetas de proyectos
let projectsContainer = document.querySelector('.projectsContainer');
projects.forEach(element => {
  renderProjects(element);
});


function renderProjects(projectsArray){
  let templateProjects = document.querySelector('#templateProjects');
  let template = templateProjects.content.cloneNode(true);
  let imgProject = template.querySelector('img');
  let projectTitle = template.querySelector('.projectTitle');
  let categoryProject = template.querySelector('.category');

  imgProject.setAttribute('src',projectsArray.images[0]);
  projectTitle.innerText = projectsArray.name;
  categoryProject.innerText = projectsArray.category;
  projectsContainer.appendChild(template);
}

//Despliegue de detalles de proyecto
//Funcion de despligue de detalles 

//Construccion de template


