import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

//* db
import { connectDB } from './config/db/dbConfig'
import { createStudent, getStudent, getStudents, getStudentSemester, updateStudent, updateStudentSemester } from './controllers/students/studentCon';
import { addAdmin, adminLogin, deleteAdmin, getAdmin, getAdmins, updateAdmin } from './controllers/admin/adminCon';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  connectDB();
  //* ipcMian.handle:start

  ipcMain.handle('create-student', createStudent);
  ipcMain.handle('get-students', getStudents);
  ipcMain.handle('get-student', getStudent);
  ipcMain.handle('update-student', updateStudent);
  ipcMain.handle('get-student-sem', getStudentSemester);
  ipcMain.handle('update-student-sem', updateStudentSemester);

  ipcMain.handle('add-admin', addAdmin);
  ipcMain.handle('get-admins', getAdmins);
  ipcMain.handle('get-admin', getAdmin);
  ipcMain.handle('update-admin', updateAdmin);
  ipcMain.handle('delete-admin', deleteAdmin);
  ipcMain.handle('login-admin', adminLogin);

  //* ipcMian.handle:end
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
