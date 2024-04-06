//<---------------------------------Funcion de despliegue de navbar mobile------------------------->
let links = document.querySelector('.links');
let menuNavBackGround = document.querySelector('.menuBackground');
let projectDetailMenuBackground = document.querySelector('.projectDetailMenuBackground');

if(menuNavBackGround.classList.contains('disable')){
  menuNavBackGround.addEventListener('click',responsiveMenuMobile);
}
//Control del Hamburger Menu en pantalla de celular
function responsiveMenuMobile(){
  links.classList.toggle('disable');
  links.classList.toggle('active');

  menuNavBackGround.classList.toggle('disable');
}
//Función para en caso de que se redimensione la página se cierra la ventana del navbar
function closedResponsiveMenuMobile(){
  const IsOpenMenuMobile = links.classList.contains('active');
  if(IsOpenMenuMobile){
    links.classList.remove('active');
    links.classList.add('disable');
  }
  menuNavBackGround.classList.add('disable');
}
//Cada vez que se redimensiona la página, se cierra la ventana del navbar
window.onresize = closedResponsiveMenuMobile; 

//<---------------------------------Funciones sección de portafolio------------------------->

//Renderizado de proyectos en la sección de proyectos
function renderProjects(project){
  let templateProjectsSelector = document.querySelector('#templateProjects');
  let templateProjects = templateProjectsSelector.content.cloneNode(true);
  let imgProject = templateProjects.querySelector('img');
  let projectTitle = templateProjects.querySelector('.projectTitle');
  let categoryProject = templateProjects.querySelector('.category');
  let projectContainer = templateProjects.querySelector('.project');

  projectContainer.addEventListener('click', function(){projectDetail(project);});

  imgProject.setAttribute('src',project.imagesOffline[0]);
  projectTitle.innerText = project.name;
  categoryProject.innerText = project.categoryPrimary;
  //Agregacion de cada proyecto
  projectsContainer.appendChild(templateProjects);
}

//<-------------------------------------Despliegue de detalles de proyecto----------------------------------->
function projectDetail(project){
  //Selección de cada parte de los detalles de proyecto
  let projectDetail = document.querySelector('#projectDetail');
  let sectionTitle = document.querySelector('#detailProjectTitle');
  let descriptionProject = document.querySelector('#detailProjectDescription');
  let documentationLink = document.querySelector('#documentationLink');
  let downloadProject = document.querySelector('#downloadProject');
  let previewProject = document.querySelector('#previewProject');
  let repositoryLink = document.querySelector('#repositoryLink');
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
  let currentIndex = 0;
  project.imagesOffline.map((image,index) =>{
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
      currentIndex = index;
      console.log(currentIndex);
    });
  });

  //Carrucel de imagenes funciones
  const rightButtonOfCarousel = document.querySelector(".positionRight");
  const leftButtonOfCarousel = document.querySelector(".positionLeft");

  function showImage() {
    const zoomImage = document.getElementById('zoomed-image');
    zoomImage.setAttribute('src', project.imagesOffline[currentIndex]);
  }

  // Función para avanzar al siguiente índice
  function rightImage() {
    // console.log("Index: " + currentIndex);
    // console.log("length: " + project.imagesOffline.length);
    // console.log("(" + currentIndex + " + 1) % "+ project.imagesOffline.length);
    currentIndex = (currentIndex + 1) % project.imagesOffline.length;
    showImage();
  }

  // Función para retroceder al índice anterior
  function leftImage() {
    // console.log("Index: " + currentIndex);
    // console.log("length: " + project.imagesOffline.length);
    // console.log("(" + currentIndex + " - 1 + "+ project.imagesOffline.length +  ") % " + project.imagesOffline.length);
    currentIndex = (currentIndex - 1 + project.imagesOffline.length) % project.imagesOffline.length;
    showImage();
  }
    
  // Agrega un evento de escucha para el botón de siguiente
  rightButtonOfCarousel.addEventListener("click", (event) => {
    event.stopPropagation();
    rightImage();
  });

  // Agrega un evento de escucha para el botón de anterior
  leftButtonOfCarousel.addEventListener("click", (event) => {
    event.stopPropagation();
    //console.log("Linea 74: " + currentIndex);
    leftImage();
  });
  


  //<---------------------------------Vadilacion de botones del proyecto------------------------------>
  //Validacion de documentación de proyecto
  if(project.documentation === ''){
    documentationLink.classList.remove('primaryButton');
    documentationLink.classList.add('disable');
  }else{
    documentationLink.classList.add('primaryButton');
    documentationLink.classList.remove('disable');
    documentationLink.setAttribute('href',project.documentation)
  }
  //Validacion de visualización web del proyecto
  if(project.PreviewOnline === ''){
    previewProject.classList.remove('primaryButton');
    previewProject.classList.add('disable');
  }else{
    previewProject.classList.add('primaryButton');
    previewProject.classList.remove('disable');
    previewProject.setAttribute('href',project.PreviewOnline)
  }
  //Validacion de Repositorio del proyecto
  if(project.RepositoryInGitHub === ''){
    repositoryLink.classList.remove('primaryIcon');
    repositoryLink.classList.add('disable');
  }else{
    repositoryLink.classList.add('primaryIcon');
    repositoryLink.classList.remove('disable');
    repositoryLink.setAttribute('href',project.RepositoryInGitHub)
  }
  //Validacion de decarga  de proyecto
  if(project.downloadProject === ''){
    downloadProject.classList.remove('primaryButton');
    downloadProject.classList.add('disable');
  }else{
    downloadProject.classList.add('primaryButton');
    downloadProject.classList.remove('disable');
    downloadProject.setAttribute('href',project.downloadProject)
  }

  //<--------------------------Cerrado de ventana de detalles del proyecto----------------------------->
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
    project.imagesOffline.map(()=>{
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

//<-----------Funciones para el control de la galeria dentro de la ventana de detalles del proyecto--------->
// Obtén todas las imágenes de la galería
const images = document.querySelectorAll('#GalleryProjectContainer img');

// Agrega un evento de escucha a cada imagen
images.forEach(image => {
  zoomInTheImage(image);
});
//Función para realizar zoom a las imagenes dentro de la ventana de detalles del proyecto 
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

//<----------------------Funciones de botones de categoria-------------------------------->
//Seleccionamiento
let categoryButtons = document.querySelectorAll('.categoryButton');

let activeCategoryButtons = [];

categoryButtons.forEach(button =>{
  button.addEventListener('click',projectClassification);
});

function projectClassification(event){
  //Identificación de botones de categoria activos
  const clickedButton = event.target;
  const index = activeCategoryButtons.indexOf(clickedButton);
  if (index === -1) {
    activeCategoryButtons.push(clickedButton);
  } else {
    activeCategoryButtons.splice(index, 1);
  }
  clickedButton.classList.toggle('activePrimaryButton');

  

  //Extraccion de proyectos clasificados
  let activeButtonIds = activeCategoryButtons.map(button => button.id);

  //Control de botones de categorias 
  if(activeButtonIds.includes('allProjects') || activeButtonIds == ''){
    const allProjectsButton = document.querySelector('#allProjects');
    //Limpieza de array de categorias 
    activeButtonIds = activeButtonIds.filter(function(item) {
      return item === "allProjects";
    });
    if(activeButtonIds == ''){
      activeButtonIds.push('allProjects');
    }
    //Reseteo de estilos
    activeCategoryButtons.map(item =>{
      if(item.classList.contains('activePrimaryButton')){
        item.classList.remove('activePrimaryButton');
      }
    });
    if(!allProjectsButton.classList.contains('activePrimaryButton')){
      allProjectsButton.classList.add('activePrimaryButton'); 
    }
  }

  else{
    const allProjectsButton = document.querySelector('#allProjects');
    allProjectsButton.classList.remove('activePrimaryButton');
  }

  // Filtrar proyectos
  const filteredProjects = projects.filter(projects => {
  // Verificar si al menos uno de los IDs de botones activos está en la lista 'categories' del proyecto
  return activeButtonIds.every(id => projects.categories.includes(id));
  });

  //Limpieza de proyectos
  cleanProjects();

  //Limpieza de texto de sin proyectos
  cleanTextWithoutProjects();

  //Renderizado de proyectos
  if(filteredProjects != ""){
    //Redenrizado de proyectos de acuerdo de a las categorias seleccionadas
    filteredProjects.forEach(ArrayProject => {
      renderProjects(ArrayProject);
    });
  }
  else if (activeButtonIds.includes('allProjects')){
    //Reinicio de la variable
    activeCategoryButtons = [];
    //Renderizado de todos los proyectos
    projects.forEach(ArrayProject => {
      renderProjects(ArrayProject);
    });
  }
  else{
    //Dibujado y creacion de texto de proyectos no encontrados
    const projectsContainer = document.querySelector('.projectsContainer');
    const withoutProjects = document.createElement('h2');
    withoutProjects.classList.add('bigDescriptioninBlackBackground');
    withoutProjects.innerText = 'Lo siento, No hay proyectos que contenga esta(s) categoria(s).'
    projectsContainer.appendChild(withoutProjects);
  }
}

function  cleanProjects(){
  let porjectBoxes = document.querySelectorAll('.project');
  porjectBoxes.forEach(box => {
    box.remove();
  });
}

function cleanTextWithoutProjects(){
  let TextWithoutProjects = document.querySelector('.bigDescriptioninBlackBackground');
  if(TextWithoutProjects){
    TextWithoutProjects.remove();
  }
}