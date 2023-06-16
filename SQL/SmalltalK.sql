--Create Database SmalltalK

--USE SmalltalK


--Create Table Users (
--	UserId int IDENTITY(1,1) Primary Key,
--	UserName nvarchar(50),
--	Password nvarchar(50),
--);


--Create Table Dictionaries (
--	DictionaryId int IDENTITY(1,1) Primary Key,
--	DictionaryName nvarchar(50),
--	Language nvarchar(50),
--	UserId int Foreign Key References Users(UserId)
--);

--Create Table UserDictionary (
--	EntryId int IDENTITY(1,1) Primary Key,
--  UserEntry nvarchar(500),
--	Translation nvarchar(500),
--	DictionaryId int Foreign Key References Dictionaries(DictionaryId)
--);


--Insert Into Users (UserName, Password)
--Values ('GWizner', null),
--('John Doe', null);

--Insert Into Dictionaries (DictionaryName, Language, UserId)
--Values ('GWizner''s Dictionary', 'Japanese', 1),
--('JDoe''s Dictionary', 'German', 2);

--Insert Into UserDictionary (UserEntry, Translation, DictionaryId)
--Values ('Ohayo', 'Hi, typically used during the morning.', 1),
--('Nani', 'What?', 1);

--select * from UserDictionary