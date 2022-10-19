# ingest-charity
Load charity data ( from CRA)  into MongoDB with Node.js and Next.js.    
You can first upload <2020 Basic _ Financial information.csv>, success, then upload <2021 Basic & Financial information.csv>.


# How to run it?
Type this commad:
~~~
npm install
npm run dev
~~~

![image](https://user-images.githubusercontent.com/75282285/161338659-5e639f35-0537-46da-ad18-d03e581d152c.png)     

then you can visit the Home Page   http://localhost:3000/


# How to set parameters to connect MongoDB?
There are two ways to config paratmeters to connect MongoDB.
## (1) use .env.local file
You can place a txt file named '.env.local' on root folder. The content such as:
~~~
MONGO= mongodb+srv://myusername:mypassword@XXXX.com
~~~
## (2) use web page to input username and password
You can input your user name and password of MongoDB on the web page. Such as this:
![image](https://user-images.githubusercontent.com/75282285/161391305-64dbf23d-5902-4125-bcc3-263ac5c9bcc1.png)


# How to upload file on the page?

In the home page, you can click the buttom 'Choose File', then click the buttom 'Upload', the file will placed on the /public_data/ folder on the Node Server.
![image](https://user-images.githubusercontent.com/75282285/161338890-d8283b24-aed3-4f09-8a3e-6415691dfcab.png)

# How to parse the data and input them into MongoDB?

In the parse page, you should be choose which MongoDB Server and Database and Collection.   
Default is the MongoDB in dev env, Database is 'charity', Collection is 'charities'.

![image](https://user-images.githubusercontent.com/75282285/161391349-6bdadfa3-2f67-4394-9240-149b5384dc82.png)    

THen you will see the waiting page.
![image](https://user-images.githubusercontent.com/75282285/161339240-f9471942-b350-4436-a713-ea6c46543f89.png)
![image](https://user-images.githubusercontent.com/75282285/161341225-e0c9f770-499f-4234-828b-dbc8958cae91.png)

In the end, if you see the success page, means the task is completed.
![image](https://user-images.githubusercontent.com/75282285/161339369-87340974-76f9-47f9-ba8b-148fc115214e.png)
