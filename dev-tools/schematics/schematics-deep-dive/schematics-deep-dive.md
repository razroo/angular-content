 Schematics Deep Dive 
=====================

In the previous chapter we have created a px-schematics schematics. The
first thing that we are going to want to modify is the collection.json
file for px-schematics. Let's add an alias for 'px', as well as create a
description.

 Creating an Alias and Description 
----------------------------------

      "px-schematics": {
        "description": "Schematic for generating app folder structure",
        "aliases": ["app"],
        "factory": "./px-schematics/index#pxSchematics"
      }

 Using NPM Link for development 
-------------------------------

We currently don't have an npm module yet. But there is a super easy way
to hook up our custom schematic to the actual Angular Schematics.

Go into the root of your px-schematics project.

Hooking things up can look like this:

    cd /Users/charlie/angularPixelillustrator/libs/px-schematics
    npm link;

Now go back into your app root

    cd /Users/charlie/angularPixelillustrator/libs/px-schematics;
    npm link px-schematics;

###  What NPM Link Actually Does? 

When we ran npm link px-schematics, it automatically targeted our
px-schematics folder.

      /Users/charlie/angularpixelillustrator/node_modules/px-schematics ->
      /Users/charlie/.npm-global/lib/node_modules/px-schematics ->
      /Users/charlie/angularpixelillustrator/libs/px-schematics

 Creating a schema.json for px-schematics 
-----------------------------------------

The schema.json works like a regular schema, telling the CLI what
options can be used. In order to add a schema that is specific for a
collection create a schema.json file in you collection root.

For example:

    cd libs/px-schematics/src/px-schematics; touch schema.json;

      {
        "$schema": "http://json-schema.org/schema",
        "id": "px-schematics",
        "title": "Add px-schematics support to a app directory",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the folder to contain files",
            "$default": {
              "$source": "argv",
              "index": 0
            }
          }
        }
      }

If we look at our schema.json file, it gives us a decent amount of
information for us to look at.

For example, there is a string type within our settings and that this is
a default for creating folder names.

 Change Folder Architecture 
---------------------------

We are going to want to brace for future collections. So let's create a
collections folder to put our schematics into.

    mdkir collections; mv px-schematics collections

We are also going to modify our collections.json config to let
schematics know that we have our own schematics file. Our
collections.json for px-schematics should look like the following:

    {
      "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
      "schematics": {
        "px-schematics": {
          "description": "Schematic for generating app folder structure",
          "aliases": ["px"],
          "schema": "./collections/px-schematics/schema.json",
          "factory": "./collections/px-schematics"
        }
      }
    }

If we were to run

    ng g px-schematics:px world

It will output test as is appropriate.
