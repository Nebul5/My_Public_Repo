// ********************* //
//    basic_script.js    //
//     by Jake Conner    //
// ********************* //

"use strict";

// ShaderProg class
// Stores a shader program for the given context.
class shaderProg{
    // ShaderProg constructor
    // PRE: Given a context, "gl" and strings containing source code for vertex and fragment shaders.
    // POST: Creates and compiles each shader, creates and links the program, and uses it for this context.
    // No exception safety.
    constructor(gl, vsource, fsource){
        this.gl = gl;

        // Setup and compile for vertex shader
        this.vshader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.vshader, vsource);
        this.gl.compileShader(this.vshader);
        if(!this.vshader){
            console.error("Vertex Shader Compile Error");
        }

        // Setup and compile for fragment shader
        this.fshader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.fshader, fsource);
        this.gl.compileShader(this.fshader);
        if(!this.fshader){
            console.error("Fragment Shader Compile Error");
        }

        // Program setup
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vshader);
        this.gl.attachShader(this.program, this.fshader);
        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error("Program Link Error");
            console.error(this.gl.getProgramInfoLog(this.program));
            return;
        }

        this.gl.useProgram(this.program);
    }
}

// vbo class, holds a vertex buffer object
class vbo{
    // vbo constructor
    // PRE: Given a context "gl" and an array "buff_array" of 32 bit floats representing 4 element vectors,
    // POST: Creates a buffer for the object to be drawn in the given context.
    constructor(gl, buff_array){
        this.buffer = gl.createBuffer();
        this.vertices = buff_array.length / 4;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, buff_array, gl.STATIC_DRAW);
        this.gl = gl;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    // draw member of vbo
    // PRE: Given a shader attribute position "pos" that stores position in a vec4,
    // POST: Sends position data of this object to the array buffer and draws it.
    draw(pos) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.enableVertexAttribArray(pos);
        this.gl.vertexAttribPointer(pos, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }
}
