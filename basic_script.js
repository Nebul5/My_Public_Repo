"use strict";

class shaderProg{
    constructor(gl, vsource, fsource){
        this.gl = gl;

        // Setup and compile for vertex shader
        this.vshader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.vshader, vsource.text);
        this.gl.compileShader(this.vshader);
        if(!this.vshader){
            console.error("Vertex Shader Compile Error");
            console.error(this.vshader);
        }

        // Setup and compile for fragment shader
        this.fshader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.fshader, fsource.text);
        this.gl.compileShader(this.fshader);
        if(!this.fshader){
            console.error("Fragment Shader Compile Error");
            console.error(this.fshader);
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

//cd Documents\"Old Pc"\Homework\"Software Construction"\SCRepo