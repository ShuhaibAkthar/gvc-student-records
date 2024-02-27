// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    createStudent: (studentData) => ipcRenderer.invoke('create-student', studentData),
    getStudents: (queryData) => ipcRenderer.invoke('get-students', queryData),
    getStudent: (id) => ipcRenderer.invoke('get-student', id),
    updateStudent: (updateData) => ipcRenderer.invoke('update-student', updateData),
    getStudentSemester: (id) => ipcRenderer.invoke('get-student-sem', id),
    updateStudentSemester: (updateData) => ipcRenderer.invoke('update-student-sem', updateData),

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