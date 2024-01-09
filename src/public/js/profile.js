const fileInput = document.querySelector('#fileInput');
const pdfFiles = document.querySelector('#pdfFiles');
const imagePreview = document.querySelector('#imagePreview');

pdfFiles.addEventListener('change', async () => {
    const files = pdfFiles.files;
    if (files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('documents', files[i]);
        }

        const userId = localStorage.getItem('uid'); 
    
        await fetch(`/api/users/${userId}/documents`, {
            method: 'POST',
            body: formData
        });

        Swal.fire({
            icon: 'success',
            title: 'OK',
            text: 'Documentos subidos correctamente!'
        }).then(() => {
            location.reload();
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Seleccione un archivo!'
        });
    }
});

fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Seleccione una imagen valida!'
            });
            return false;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.style.maxWidth = '150px'; 
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        };
        
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('image', file);

        const userId = localStorage.getItem('uid'); 
    
        await fetch(`/api/users/${userId}/profile`, {
            method: 'POST',
            body: formData
        });

        Swal.fire({
            icon: 'success',
            title: 'OK',
            text: 'Imagen subida correctamente!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Seleccione un archivo!'
        });
    }
});

const deleteDocument = async (filename) => {
    const userId = localStorage.getItem('uid'); 
    await fetch(`/api/users/${userId}/documents/${filename}`, {method: 'DELETE'});
    Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Documentos eliminado exitosamente!'
    }).then(() => {
        location.reload();
    });   
}