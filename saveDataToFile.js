const { randomUUID } = require('crypto');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000; 
app.use(express.json());
const QuestionnaireData = 'data.json';
const UserRponseData = 'UserReponse.json';
const EssaiData='Essai.json';
const DashbordData='dashbord.json';
const ReadQuesData = (callback) => {
  fs.readFile(QuestionnaireData, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        callback(null, []);
      } else {
        console.error('Error reading from the file:', err);
        callback(err);
      }
    } else {
      try {
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      } catch (parseErr) {
        console.error('Error parsing existing data:', parseErr);
        callback(parseErr);
      }
    }
  });
};
const readEssaiData=(callback)=>{
  fs.readFile(EssaiData,'utf8',(err,data)=>{
    if(err){
    if (err.code === 'ENOENT') {
      callback(null,[]);
    }else{
      console.error('Error reading from the file:',err);
      callback(err);
    }
  }else{
      try{
        const jsonData=JSON.parse(data);
        callback(null,jsonData);
      }catch(parseErr){
        console.error('Error parsing existing data:',parseErr);
        callback(parseErr);
      }
  }
  });
}
const readUserReponse = (callback) => {
  fs.readFile(UserRponseData, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        callback(null, []);
      } else {
        console.error('Error reading from the file:', err);
        callback(err);
      }
    } else {
      try {
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      } catch (parseErr) {
        console.error('Error parsing existing data:', parseErr);
        callback(parseErr);
      }
    }
  });
};

function readDashbordData(callback) {
  fs.readFile(DashbordData, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        callback(null, []);
      } else {
        console.log('Error reading from file:', err);
        callback(err);
      }
    } else {
      try {
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      } catch (parseErr) {
        console.log('Error parsing existing data:', parseErr);
        callback(parseErr);
      }
    }
  });
}

function saveDashbordData(data, callback) {
    readDashbordData((readErr, dashboardData) => {
      if (readErr) {
        console.error('Error reading dashboard data:', readErr);
        callback(readErr);
        return;
      }
  
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const foundData = dashboardData.find((dashboardItem) =>
          dashboardItem.question.QuestionRank === item.QuestionRank
        );
  
        if (foundData) {
          foundData.question.nbreponse = (foundData.question.nbreponse || 0) + 1;
  
          for (const responseLabel of item.reponse) {
            const foundResponse = foundData.response.find(
              (responseItem) => responseItem.Label === responseLabel
            );
  
            if (foundResponse) {
              foundResponse.Value++;
            }
          }
        }
      }
  
      const jsonData = JSON.stringify(dashboardData, null, 2);
  
      fs.writeFile(DashbordData, jsonData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to the file:', writeErr);
          callback(writeErr);
        } else {
          console.log('Dashboard data saved successfully!');
          callback(null);
        }
      });
    });
  }
  
readDashbordData((err, jsonData) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Read data:', jsonData);
  }
});

/**
 * Questionnaire API 
 * readData ==> Lire tous les questionnaires
 * readData/:id ==> lire un questionnaire avec id
 * writeData ==> l'insertion d'un questionnaire 
 */
app.get('/readData', (req, res) => {
  ReadQuesData((err, jsonData) => {
    if (err) {
      res.status(500).json({ error: 'Error reading from the file', err });
    } else {
      res.json(jsonData);
    }
  });
});

app.get('/readData/:id', (req, res) => {
  const QuestionnaireId = req.params.id;

  if (!/^[a-zA-Z0-9]+$/.test(QuestionnaireId)) {
    return res.status(400).json({ error: 'Invalid Questionnaire ID' });
  }

  ReadQuesData((err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading from the file', err });
    }

    const questionnaires = jsonData.filter((q) => q.QuestionnaireId === QuestionnaireId);

    if (questionnaires.length > 0) {
      res.json(questionnaires);
    } else {
      res.status(404).json({ error: 'Questionnaire not found' });
    }
  });
});
app.post('/writeData', (req, res) => {
  const newData = req.body;
  ReadQuesData((err, dataArray) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading from the file', err });
    }

    dataArray.push(newData);

    const jsonData = JSON.stringify(dataArray, null, 2);

    fs.writeFile(QuestionnaireData, jsonData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
        res.status(500).json({ error: 'Error writing to the file', writeErr });
      } else {
        console.log('Data saved successfully!');
        res.json({ message: 'Data saved successfully' });
      }
    });
  });
});


/**
 * UserReponse API 
 * 
 * 
 * StoreUserReponse ==> l'insertion des Reponse d'un utlisateur 
 */
app.post('/StoreUserReponse', (req, res) => {
  const newData = req.body;
  readUserReponse((err, dataArray) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading from the file', err });
    }
    dataArray.push(newData);
    const jsonData = JSON.stringify(dataArray, null, 2);
    fs.writeFile(UserRponseData, jsonData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
        res.status(500).json({ error: 'Error writing to the file', writeErr });
      } else {
        res.json({ message: 'Data saved successfully' });
        saveDashbordData(newData);
      }
    });
  });
});
/**
 * Essai API 
 * 
 * 
 * CreateEssai ==> l'insertion d'un essai
 */
app.post('/CreateEssai', (req, res) => {
  const newData = req.body;
  readEssaiData((err, dataArray) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading from the file', err });
    }
    dataArray.push(newData);
    const jsonData = JSON.stringify(dataArray, null, 2);

    fs.writeFile(EssaiData, jsonData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
        res.status(500).json({ error: 'Error writing to the file', writeErr });
      } else {
        console.log('Data saved successfully!');
        res.json({ message: 'Data saved successfully' });
      }
    });
  });
});
app.put('/InsertUserEmail/:id', (req, res) => {
  const newEmail = req.body.UserEmail;
  const id = req.params.id;

  readEssaiData((err, dataArray) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading from the file', err });
    }
    const userIndex = dataArray.findIndex(item => item._id === id);
    if (userIndex !== -1) {
      dataArray[userIndex].UserEmail = newEmail;
      const jsonData = JSON.stringify(dataArray, null, 2);
      fs.writeFile(EssaiData, jsonData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to the file:', writeErr);
          res.status(500).json({ error: 'Error writing to the file', writeErr });
        } else {
          console.log('Data saved successfully!');
          res.json({ message: 'Data saved successfully' });
        }
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

app.get('/readDashBordData', (req, res) => {
  readDashbordData((err, jsonData) => {
    if (err) {
      res.status(500).json({ error: 'Error reading from the file', err });
    } else {
      res.json(jsonData);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
