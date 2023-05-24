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

  projectContainer.addEventListener('click', function(){projectDetail(project);});

  imgProject.setAttribute('src',project.images[0]);
  projectTitle.innerText = project.name;
  categoryProject.innerText = project.category;
  //Agregacion de cada proyecto
  projectsContainer.appendChild(templateProjects);
}

//Despliegue de detalles de proyecto
function projectDetail(project){
  //Selección de cada parte de los detalles de proyecto
  let projectDetail = document.querySelector('#projectDetail');
  let sectionTitle = document.querySelector('#detailProjectTitle');
  let descriptionProject = document.querySelector('#detailProjectDescription');
  let documentationLink = document.querySelector('#DocumentationLink');
  let toolsContainer = document.querySelector('.usedToolsContainerInProjectdetails');
  let closedContainer = document.querySelector('.closeContainer');
  let projectDetailsContainer = document.querySelector('.projectDetailsContainer');
  let galleryContainer = document.querySelector('#GalleryProjectContainer')
  let Body = document.body;

  //Apareción de aside
  projectDetail.classList.toggle('disable');
  projectDetail.classList.add('active');
  projectDetailMenuBackground.classList.remove('disable');

  //Ocutar de scroll de la pagina principal
  Body.style.overflow = 'hidden';
  
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

  //Mapeo de imagenes para la lista
  project.images.map(image =>{
    let imageCreater = document.createElement('img');
    imageCreater.classList.add('imageOfGallery');
    imageCreater.setAttribute('src',image);
    galleryContainer.appendChild(imageCreater);

    //Evento de zoom en cada imagen dentro de la galeria
    imageCreater.addEventListener('click', () => {
      // Muestra el overlay y la imagen ampliada
      const zoomOverlay = document.getElementById('zoom-overlay');
      const zoomImage = document.getElementById('zoomed-image');
      zoomOverlay.style.display = 'flex';
      zoomImage.setAttribute('src', imageCreater.src);
    });
  });

 


  //Vadilacion de botones del proyecto
  //Validacion de documentacion de proyecto
  if(project.documentation === ''){
    documentationLink.classList.remove('primaryButton');
  }else{
    documentationLink.classList.add('primaryButton');
    documentationLink.setAttribute('href',project.documentation)
  }
  //Validacion de web del proyecto
  //Validacion de Repositorio del proyecto

  
  
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
    //Ocultar la ventana de detalles del proyecto
    projectDetail.classList.add('disable');
    projectDetail.classList.remove('active');
    projectDetailMenuBackground.classList.add('disable');
    //Aparecion de scroll de la pagina principal
    Body.style.overflow = 'auto';

    //Limpieza de lista de habilidades
    project.toolsUsed.map(() => {
      let toolsList = document.querySelector('.list');
      if(toolsList){
        toolsList.remove();
      }
    });
    //Limpieza de imagenes de la galeria
    project.images.map(()=>{
       let imageOfGallery = document.querySelector('.imageOfGallery');
       if(imageOfGallery){
        imageOfGallery.remove();
       }
    });
  }
}

//Generación de etiquetas de proyectos
let projectsContainer = document.querySelector('.projectsContainer');
projects.forEach(ArrayProject => {
  renderProjects(ArrayProject);

});

//------------------------------------Prueba-----------------------------------------------------------------
// Obtén todas las imágenes de la galería
const images = document.querySelectorAll('#GalleryProjectContainer img');

// Agrega un evento de escucha a cada imagen
images.forEach(image => {
  zoomInTheImage(image);
});

function zoomInTheImage(image) {
  image.addEventListener('click', () => {
    // Muestra el overlay y la imagen ampliada
    const zoomOverlay = document.getElementById('zoom-overlay');
    const zoomImage = document.getElementById('zoomed-image');
    zoomOverlay.style.display = 'flex';
    zoomImage.setAttribute('src', image.src);
  });
}

// Agrega un evento de escucha para ocultar el overlay al hacer clic en él
const zoomOverlay = document.getElementById('zoom-overlay');
zoomOverlay.addEventListener('click', () => {
  zoomOverlay.style.display = 'none';
});

// Evita que se cierre la imagen ampliada al hacer clic en ella
const zoomImage = document.getElementById('zoomed-image');
zoomImage.addEventListener('click', (event) => {
  event.stopPropagation();
});