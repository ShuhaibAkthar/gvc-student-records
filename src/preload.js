// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    createStudent: (studentData) => ipcRenderer.invoke('create-student', studentData),
    getStudents: (queryData) => ipcRenderer.invoke('get-students', queryData),
    getStudent: (id) => ipcRenderer.invoke('get-student', id),
    updateStudent: (updateData) => ipcRenderer.invoke('update-student', updateData),

    addAdmin: (adminData) => ipcRenderer.invoke('add-admin', adminData),
    getAdmins: (queryData) => ipcRenderer.invoke('get-admins', queryData),
    getAdmin: (id) => ipcRenderer.invoke('get-admin', id),
    updateAdmin: (updateData) => ipcRenderer.invoke('update-admin', updateData),
    deleteAdmin: (id) => ipcRenderer.invoke('delete-admin', id),
    loginAdmin: (loginData) => ipcRenderer.invoke('login-admin', loginData),

});

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, data) => {
            // Whitelist channels to ensure they only send valid messages
            const validChannels = ['success-res', 'error-res'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel, listener) => {
            // Whitelist channels to ensure they only receive valid messages
            const validChannels = ['success-res', 'error-res'];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
            }
        },
        removeAllListeners: (channel) => {
            ipcRenderer.removeAllListeners(channel);
        },
    },
});