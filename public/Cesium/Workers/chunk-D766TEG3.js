/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.117
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as $}from"./chunk-JOOO6TIY.js";import{a as b}from"./chunk-MS2KBTBR.js";import{a as U}from"./chunk-YNTFMT6T.js";import{a as E}from"./chunk-4S4T622A.js";import{c as z,d as L}from"./chunk-WRT5H5YZ.js";import{a as D,d as y}from"./chunk-2Z7LHEFB.js";import{b as G}from"./chunk-URXUHQWZ.js";import{a as k}from"./chunk-2ZKHVIZO.js";import{d as B}from"./chunk-H26ARMDM.js";import{a as v}from"./chunk-WF3Q7FOG.js";import{a as F,b as I}from"./chunk-NERDVOKQ.js";import{e as a}from"./chunk-4ACNSQDC.js";function w(e,n,t){e=v(e,0),n=v(n,0),t=v(t,0),this.value=new Float32Array([e,n,t])}Object.defineProperties(w.prototype,{componentDatatype:{get:function(){return k.FLOAT}},componentsPerAttribute:{get:function(){return 3}},normalize:{get:function(){return!1}}});w.fromCartesian3=function(e){return I.defined("offset",e),new w(e.x,e.y,e.z)};w.toValue=function(e,n){return I.defined("offset",e),a(n)||(n=new Float32Array([e.x,e.y,e.z])),n[0]=e.x,n[1]=e.y,n[2]=e.z,n};var j=w;function K(e,n,t){let i=!t,r=e.length,c;if(!i&&r>1){let o=e[0].modelMatrix;for(c=1;c<r;++c)if(!G.equals(o,e[c].modelMatrix)){i=!0;break}}if(i)for(c=0;c<r;++c)a(e[c].geometry)&&b.transformToWorldCoordinates(e[c]);else G.multiplyTransformation(n,e[0].modelMatrix,n)}function P(e,n){let t=e.attributes,i=t.position,r=i.values.length/i.componentsPerAttribute;t.batchId=new L({componentDatatype:k.FLOAT,componentsPerAttribute:1,values:new Float32Array(r)});let c=t.batchId.values;for(let o=0;o<r;++o)c[o]=n}function N(e){let n=e.length;for(let t=0;t<n;++t){let i=e[t];a(i.geometry)?P(i.geometry,t):a(i.westHemisphereGeometry)&&a(i.eastHemisphereGeometry)&&(P(i.westHemisphereGeometry,t),P(i.eastHemisphereGeometry,t))}}function Q(e){let n=e.instances,t=e.projection,i=e.elementIndexUintSupported,r=e.scene3DOnly,c=e.vertexCacheOptimize,o=e.compressVertices,g=e.modelMatrix,s,u,m,p=n.length;for(s=0;s<p;++s)if(a(n[s].geometry)){m=n[s].geometry.primitiveType;break}for(s=1;s<p;++s)if(a(n[s].geometry)&&n[s].geometry.primitiveType!==m)throw new F("All instance geometries must have the same primitiveType.");if(K(n,g,r),!r)for(s=0;s<p;++s)a(n[s].geometry)&&b.splitLongitude(n[s]);if(N(n),c)for(s=0;s<p;++s){let f=n[s];a(f.geometry)?(b.reorderForPostVertexCache(f.geometry),b.reorderForPreVertexCache(f.geometry)):a(f.westHemisphereGeometry)&&a(f.eastHemisphereGeometry)&&(b.reorderForPostVertexCache(f.westHemisphereGeometry),b.reorderForPreVertexCache(f.westHemisphereGeometry),b.reorderForPostVertexCache(f.eastHemisphereGeometry),b.reorderForPreVertexCache(f.eastHemisphereGeometry))}let l=b.combineInstances(n);for(p=l.length,s=0;s<p;++s){u=l[s];let f=u.attributes;if(r)for(let d in f)f.hasOwnProperty(d)&&f[d].componentDatatype===k.DOUBLE&&b.encodeAttribute(u,d,`${d}3DHigh`,`${d}3DLow`);else for(let d in f)if(f.hasOwnProperty(d)&&f[d].componentDatatype===k.DOUBLE){let h=`${d}3D`,x=`${d}2D`;b.projectTo2D(u,d,h,x,t),a(u.boundingSphere)&&d==="position"&&(u.boundingSphereCV=y.fromVertices(u.attributes.position2D.values)),b.encodeAttribute(u,h,`${h}High`,`${h}Low`),b.encodeAttribute(u,x,`${x}High`,`${x}Low`)}o&&b.compressVertices(u)}if(!i){let f=[];for(p=l.length,s=0;s<p;++s)u=l[s],f=f.concat(b.fitToUnsignedShortIndices(u));l=f}return l}function T(e,n,t,i){let r,c,o,g=i.length-1;if(g>=0){let u=i[g];r=u.offset+u.count,o=u.index,c=t[o].indices.length}else r=0,o=0,c=t[o].indices.length;let s=e.length;for(let u=0;u<s;++u){let p=e[u][n];if(!a(p))continue;let l=p.indices.length;r+l>c&&(r=0,c=t[++o].indices.length),i.push({index:o,offset:r,count:l}),r+=l}}function X(e,n){let t=[];return T(e,"geometry",n,t),T(e,"westHemisphereGeometry",n,t),T(e,"eastHemisphereGeometry",n,t),t}var S={};S.combineGeometry=function(e){let n,t,i=e.instances,r=i.length,c,o,g=!1;r>0&&(n=Q(e),n.length>0&&(t=b.createAttributeLocations(n[0]),e.createPickOffsets&&(c=X(i,n))),a(i[0].attributes)&&a(i[0].attributes.offset)&&(o=new Array(r),g=!0));let s=new Array(r),u=new Array(r);for(let m=0;m<r;++m){let p=i[m],l=p.geometry;a(l)&&(s[m]=l.boundingSphere,u[m]=l.boundingSphereCV,g&&(o[m]=p.geometry.offsetAttribute));let f=p.eastHemisphereGeometry,d=p.westHemisphereGeometry;a(f)&&a(d)&&(a(f.boundingSphere)&&a(d.boundingSphere)&&(s[m]=y.union(f.boundingSphere,d.boundingSphere)),a(f.boundingSphereCV)&&a(d.boundingSphereCV)&&(u[m]=y.union(f.boundingSphereCV,d.boundingSphereCV)))}return{geometries:n,modelMatrix:e.modelMatrix,attributeLocations:t,pickOffsets:c,offsetInstanceExtend:o,boundingSpheres:s,boundingSpheresCV:u}};function Y(e,n){let t=e.attributes;for(let i in t)if(t.hasOwnProperty(i)){let r=t[i];a(r)&&a(r.values)&&n.push(r.values.buffer)}a(e.indices)&&n.push(e.indices.buffer)}function Z(e,n){let t=e.length;for(let i=0;i<t;++i)Y(e[i],n)}function _(e){let n=1,t=e.length;for(let i=0;i<t;i++){let r=e[i];if(++n,!a(r))continue;let c=r.attributes;n+=7+2*y.packedLength+(a(r.indices)?r.indices.length:0);for(let o in c)if(c.hasOwnProperty(o)&&a(c[o])){let g=c[o];n+=5+g.values.length}}return n}S.packCreateGeometryResults=function(e,n){let t=new Float64Array(_(e)),i=[],r={},c=e.length,o=0;t[o++]=c;for(let g=0;g<c;g++){let s=e[g],u=a(s);if(t[o++]=u?1:0,!u)continue;t[o++]=s.primitiveType,t[o++]=s.geometryType,t[o++]=v(s.offsetAttribute,-1);let m=a(s.boundingSphere)?1:0;t[o++]=m,m&&y.pack(s.boundingSphere,t,o),o+=y.packedLength;let p=a(s.boundingSphereCV)?1:0;t[o++]=p,p&&y.pack(s.boundingSphereCV,t,o),o+=y.packedLength;let l=s.attributes,f=[];for(let h in l)l.hasOwnProperty(h)&&a(l[h])&&(f.push(h),a(r[h])||(r[h]=i.length,i.push(h)));t[o++]=f.length;for(let h=0;h<f.length;h++){let x=f[h],C=l[x];t[o++]=r[x],t[o++]=C.componentDatatype,t[o++]=C.componentsPerAttribute,t[o++]=C.normalize?1:0,t[o++]=C.values.length,t.set(C.values,o),o+=C.values.length}let d=a(s.indices)?s.indices.length:0;t[o++]=d,d>0&&(t.set(s.indices,o),o+=d)}return n.push(t.buffer),{stringTable:i,packedData:t}};S.unpackCreateGeometryResults=function(e){let n=e.stringTable,t=e.packedData,i,r=new Array(t[0]),c=0,o=1;for(;o<t.length;){if(!(t[o++]===1)){r[c++]=void 0;continue}let s=t[o++],u=t[o++],m=t[o++];m===-1&&(m=void 0);let p,l;t[o++]===1&&(p=y.unpack(t,o)),o+=y.packedLength,t[o++]===1&&(l=y.unpack(t,o)),o+=y.packedLength;let h,x,C,H=new E,q=t[o++];for(i=0;i<q;i++){let A=n[t[o++]],M=t[o++];C=t[o++];let J=t[o++]!==0;h=t[o++],x=k.createTypedArray(M,h);for(let O=0;O<h;O++)x[O]=t[o++];H[A]=new L({componentDatatype:M,componentsPerAttribute:C,normalize:J,values:x})}let V;if(h=t[o++],h>0){let A=x.length/C;for(V=U.createTypedArray(A,h),i=0;i<h;i++)V[i]=t[o++]}r[c++]=new z({primitiveType:s,geometryType:u,boundingSphere:p,boundingSphereCV:l,indices:V,attributes:H,offsetAttribute:m})}return r};function ee(e,n){let t=e.length,i=new Float64Array(1+t*19),r=0;i[r++]=t;for(let c=0;c<t;c++){let o=e[c];if(G.pack(o.modelMatrix,i,r),r+=G.packedLength,a(o.attributes)&&a(o.attributes.offset)){let g=o.attributes.offset.value;i[r]=g[0],i[r+1]=g[1],i[r+2]=g[2]}r+=3}return n.push(i.buffer),i}function te(e){let n=e,t=new Array(n[0]),i=0,r=1;for(;r<n.length;){let c=G.unpack(n,r),o;r+=G.packedLength,a(n[r])&&(o={offset:new j(n[r],n[r+1],n[r+2])}),r+=3,t[i++]={modelMatrix:c,attributes:o}}return t}S.packCombineGeometryParameters=function(e,n){let t=e.createGeometryResults,i=t.length;for(let r=0;r<i;r++)n.push(t[r].packedData.buffer);return{createGeometryResults:e.createGeometryResults,packedInstances:ee(e.instances,n),ellipsoid:e.ellipsoid,isGeographic:e.projection instanceof D,elementIndexUintSupported:e.elementIndexUintSupported,scene3DOnly:e.scene3DOnly,vertexCacheOptimize:e.vertexCacheOptimize,compressVertices:e.compressVertices,modelMatrix:e.modelMatrix,createPickOffsets:e.createPickOffsets}};S.unpackCombineGeometryParameters=function(e){let n=te(e.packedInstances),t=e.createGeometryResults,i=t.length,r=0;for(let g=0;g<i;g++){let s=S.unpackCreateGeometryResults(t[g]),u=s.length;for(let m=0;m<u;m++){let p=s[m],l=n[r];l.geometry=p,++r}}let c=B.clone(e.ellipsoid),o=e.isGeographic?new D(c):new $(c);return{instances:n,ellipsoid:c,projection:o,elementIndexUintSupported:e.elementIndexUintSupported,scene3DOnly:e.scene3DOnly,vertexCacheOptimize:e.vertexCacheOptimize,compressVertices:e.compressVertices,modelMatrix:G.clone(e.modelMatrix),createPickOffsets:e.createPickOffsets}};function R(e){let n=e.length,t=1+(y.packedLength+1)*n,i=new Float32Array(t),r=0;i[r++]=n;for(let c=0;c<n;++c){let o=e[c];a(o)?(i[r++]=1,y.pack(e[c],i,r)):i[r++]=0,r+=y.packedLength}return i}function W(e){let n=new Array(e[0]),t=0,i=1;for(;i<e.length;)e[i++]===1&&(n[t]=y.unpack(e,i)),++t,i+=y.packedLength;return n}S.packCombineGeometryResults=function(e,n){a(e.geometries)&&Z(e.geometries,n);let t=R(e.boundingSpheres),i=R(e.boundingSpheresCV);return n.push(t.buffer,i.buffer),{geometries:e.geometries,attributeLocations:e.attributeLocations,modelMatrix:e.modelMatrix,pickOffsets:e.pickOffsets,offsetInstanceExtend:e.offsetInstanceExtend,boundingSpheres:t,boundingSpheresCV:i}};S.unpackCombineGeometryResults=function(e){return{geometries:e.geometries,attributeLocations:e.attributeLocations,modelMatrix:e.modelMatrix,pickOffsets:e.pickOffsets,offsetInstanceExtend:e.offsetInstanceExtend,boundingSpheres:W(e.boundingSpheres),boundingSpheresCV:W(e.boundingSpheresCV)}};var Ge=S;export{Ge as a};
