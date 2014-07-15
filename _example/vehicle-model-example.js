define(['jquery', 'config'], function($, config) {
  var Vehicle;
  Vehicle = Backbone.Model.extend({
    sync: function(method, model, options) {
      var _this = this;
      if(method = 'read') {
        return $.getJSON(window.MODEL_URL + options.rangeCode + '.json', function(data) {
          var parsed;
          _this.initBodyStyleDiff(data);
          parsed = _this.parse(data, options.rangeCode);
          if(config.rangeCodes.length === 2) {
            return $.getJSON(window.MODEL_URL + config.rangeCodes[1] + '.json', function(data) {
              return _this.set(_this.merge(parsed, _this.parse(data, config.rangeCodes[1], true)));
            });
          } else {
            return _this.set(parsed);
          }
        });
      }
    },
    initBodyStyleDiff: function(response) {
      return this.bodyStyleDiff = this.getBodyStyleDiff(response.bodyStyles);
    },
    parse: function(response, rangeCode, isHybrid) {
      var bodyStyle, result,
        _this = this;
      if(_.isUndefined(isHybrid)) {
        isHybrid = false;
      }
      result = {
        id: Number(response.id),
        rangeCode: response.rangecode,
        bodyStyles: [],
        colours: [],
        name: response.name
      };
      _.each(response.colours, function(colour) {
        return result.colours.push({
          code: colour.code,
          name: colour.name,
          price: Number(colour.price)
        });
      });
      bodyStyle = {};
      _.each(response.bodyStyles, function(srcBodyStyle, idx) {
        if(idx === 0) {
          bodyStyle = {
            id: srcBodyStyle.id,
            name: srcBodyStyle.name,
            numberOfSeats: srcBodyStyle.numberOfSeats,
            numberOfDoors: srcBodyStyle.numberOfDoors,
            price: Number(srcBodyStyle.price),
            grades: []
          };
        }
        return _.each(srcBodyStyle.grades, function(srcGrade) {
          var grade, gradeName, hash;
          hash = [srcGrade.code, srcBodyStyle.id];
          if(config.hybridsInModels) {
            hash.push(rangeCode);
          }
          gradeName = srcGrade.name;
          if(isHybrid && config.hybridsInModels) {
            gradeName += ' Hybrid';
          }
          if(_this.moreThanOneGrade(srcGrade, srcBodyStyle, response) && !config.bodyStyleSwitch) {
            gradeName = srcGrade.name + ' ' + srcBodyStyle[_this.bodyStyleDiff.toggle] + ' ' + _this.bodyStyleDiff.name;
          }
          grade = {
            code: srcGrade.code,
            hash: hash.join('-'),
            name: gradeName.replace(/^\s+|\s+$/g, ''),
            originalName: srcGrade.name,
            order: srcGrade.order,
            price: Number(srcGrade.price),
            mdata: _this.parseMdata(srcGrade.mdata[0]),
            discount: _this.gradeDiscount(srcGrade),
            enginesTransmissions: [],
            bodyStyle: srcBodyStyle
          };
          bodyStyle.grades.push(grade);
          _this.gradeDiscount(srcGrade);
          return _.each(srcGrade.enginesTransmissions, function(srcEngineTransmission) {
            var engineTransmission;
            engineTransmission = {
              colours: srcEngineTransmission.colours,
              derivatives: [],
              description: srcEngineTransmission.description,
              fuelCode: srcEngineTransmission.fuelcode,
              id: srcEngineTransmission.id,
              mdata: _this.parseMdata(srcEngineTransmission.mdata[0]),
              price: srcEngineTransmission.price - grade.price,
              transmission: srcEngineTransmission.transmission,
              discount: _this.parseDiscount(srcEngineTransmission.discounts)
            };
            grade.enginesTransmissions.push(engineTransmission);
            return _.each(srcEngineTransmission.derivatives, function(srcDerivative) {
              var derivative;
              derivative = {
                rangeCode: response.rangecode,
                derivativeCode: srcDerivative.tgbderivativecode,
                code: srcDerivative.options[0].optionscode,
                mdata: _this.parseMdata(srcDerivative.options[0].mdata[0]),
                name: srcDerivative.options[0].options,
                price: srcDerivative.ontheroadprice - srcEngineTransmission.price,
                discount: _this.parseDiscount(srcDerivative.discounts)
              };
              return engineTransmission.derivatives.push(derivative);
            });
          });
        });
      });
      result.bodyStyles.push(bodyStyle);
      return result;
    },
    parseMdata: function(mdata) {
      return {
        condensed: this.mdataTodata(mdata.condensed),
        expanded: this.mdataTodata(mdata.expanded)
      };
    },
    mdataTodata: function(mdata) {
      var result;
      result = _.map(_.without(_.unescape(mdata).replace(/\n/g, ': ').replace(/<sub>/, 'SUB1').replace(/<\/sub>/, 'SUB2').replace(/<.*?>/g, "|").replace(/SUB1/, '<sub>').replace(/SUB2/, '</sub>').split("|"), ''), function(value) {
        return value.replace(/^\s+|\s+$/g, '').replace(/\:$/, '');
      });
      result = _.filter(result, function(val) {
        return val.length > 2;
      });
      return result;
    },
    parseDiscount: function(discounts) {
      var _ref, _ref1, _ref2, _ref3;
      return {
        amount: Number((_ref = discounts != null ? (_ref1 = discounts[0]) != null ? _ref1.custsaveamount : void 0 : void 0) != null ? _ref : 0),
        text: (_ref2 = discounts != null ? (_ref3 = discounts[0]) != null ? _ref3.custsavetext : void 0 : void 0) != null ? _ref2 : ''
      };
    },
    gradeDiscount: function(grade) {
      var discount, hasGradeDiscount,
        _this = this;
      discount = null;
      hasGradeDiscount = true;
      _.each(grade.enginesTransmissions, function(engineTransmission) {
        return _.each(engineTransmission.derivatives, function(derivative) {
          var _ref, _ref1;
          if(_.isNull(discount)) {
            discount = (_ref = derivative.discounts) != null ? _ref[0] : void 0;
          }
          if(!_.isEqual(discount, (_ref1 = derivative.discounts) != null ? _ref1[0] : void 0)) {
            return hasGradeDiscount = false;
          }
        });
      });
      return this.parseDiscount([
        hasGradeDiscount ? discount : {
          custsaveamount: 0,
          custsavetext: ''
        }
      ]);
    },
    merge: function(one, two) {
      _.each(two.bodyStyles, function(bodyStyle) {
        var dstBodyStyle, _ref;
        dstBodyStyle = (_ref = _.where(one.bodyStyles, {
          id: bodyStyle.id
        })[0]) != null ? _ref : one.bodyStyles[0];
        return _.each(bodyStyle.grades, function(grade) {
          var dstGrade;
          if(config.hybridsInModels) {
            dstGrade = grade;
            dstBodyStyle.grades.push(grade);
          } else {
            dstGrade = _.where(dstBodyStyle.grades, {
              hash: grade.hash
            })[0];
            if(_.isUndefined(dstGrade)) {
              dstGrade = grade;
              dstBodyStyle.grades.push(grade);
            }
          }
          return _.each(grade.enginesTransmissions, function(engine) {
            var dstEngine;
            dstEngine = _.where(dstGrade.enginesTransmissions, {
              id: engine.id
            });
            if(dstEngine.length === 0) {
              engine.price = grade.price - dstGrade.price + engine.price;
              dstGrade.enginesTransmissions.push(engine);
              return _.each(two.colours, function(colour) {
                if(!_.contains(one.colours, colour.code)) {
                  return one.colours.push(colour);
                }
              });
            }
          });
        });
      });
      return one;
    },
    moreThanOneGrade: function(grade, bodyStyle, response) {
      var result;
      result = false;
      _.each(response.bodyStyles, function(bodyStyleSrc) {
        if(bodyStyleSrc.id !== bodyStyle.id) {
          return _.each(bodyStyleSrc.grades, function(gradeSrc) {
            if(gradeSrc.code === grade.code) {
              return result = true;
            }
          });
        }
      });
      return result;
    },
    models: function() {
      var result;
      result = [];
      _.each(this.get('bodyStyles'), function(bodyStyle) {
        return _.each(bodyStyle.grades, function(grade) {
          return result.push({
            bodyStyle: bodyStyle,
            grade: grade,
            hash: grade.hash,
            visible: true
          });
        });
      });
      return result;
    },
    available: function(options) {
      var result;
      if(_.isUndefined(options.grade)) {
        delete options.grade;
      }
      if(_.isUndefined(options.engine)) {
        delete options.engine;
      }
      if(_.isString(options.grade) && _.isString(options.engine)) {
        options.derivativeCode = this.getOptionCode(options);
        if(_.isUndefined(options.derivativeCode)) {
          delete options.derivativeCode;
        }
        delete options.derivative;
      }
      if(_.isUndefined(options.derivative) || options.derivative.length === 0) {
        delete options.derivative;
      }
      result = {
        colours: this.filtered(_.pick(options, 'grade', 'engine', 'derivative')).colours,
        engines: this.filtered(_.pick(options, 'colour', 'grade', 'derivative')).engines,
        grades: this.filtered(_.pick(options, 'colour', 'engine', 'derivative')).grades,
        derivatives: this.filtered(_.pick(options, 'colour', 'grade', 'engine')).derivatives
      };
      return result;
    },
    locked: function(lock, options) {
      var remove, result;
      result = this.available(options);
      if(result.engines.length === 0 || result.grades.length === 0 || result.colours.length === 0) {
        switch(lock) {
          case 'grade':
            remove = 'engine';
            break;
          case 'engine':
            remove = 'colour';
            break;
          case 'colour':
            remove = 'derivative';
            break;
          case 'derivative':
            remove = 'grade';
        }
        result = this.locked(remove, _.omit(options, remove));
      }
      return result;
    },
    filtered: function(options) {
      var result, rows;
      if(_.keys(options).length) {
        rows = _.where(this.table(), options);
      } else {
        rows = this.table();
      }
      result = {
        engines: _.uniq(_.pluck(rows, 'engine')),
        grades: _.uniq(_.pluck(rows, 'grade')),
        derivatives: _.uniq(_.pluck(rows, 'derivativeName')),
        colours: _.uniq(_.pluck(rows, 'colour'))
      };
      return result;
    },
    engineDetails: function(hash) {
      var result;
      result = null;
      _.each(this.get('bodyStyles'), function(bodyStyle) {
        return result = _.where(bodyStyle.grades, {
          hash: hash
        })[0].enginesTransmissions;
      });
      return result;
    },
    optionDetails: function() {},
    table: function() {
      var result;
      if(_.isArray(this.rowData)) {
        return this.rowData;
      }
      result = [];
      _.each(this.get('bodyStyles'), function(bodyStyle) {
        return _.each(bodyStyle.grades, function(grade) {
          return _.each(grade.enginesTransmissions, function(engine) {
            return _.each(engine.colours, function(colour) {
              if(engine.derivatives.length) {
                return _.each(engine.derivatives, function(derivative) {
                  return result.push({
                    bodyStyle: bodyStyle.id,
                    grade: grade.hash,
                    engine: engine.id,
                    colour: colour,
                    derivativeCode: derivative.code,
                    derivativeName: derivative.name
                  });
                });
              } else {
                return result.push({
                  bodyStyle: bodyStyle.id,
                  grade: grade.hash,
                  engine: engine.id,
                  colour: colour,
                  derivativeCode: '',
                  derivativeName: ''
                });
              }
            });
          });
        });
      });
      this.rowData = result;
      return result;
    },
    engines: function() {
      var found, result;
      result = [];
      found = {};
      _.each(this.get('bodyStyles'), function(bodyStyle) {
        return _.each(bodyStyle.grades, function(grade) {
          return _.each(grade.enginesTransmissions, function(engine) {
            if(_.isUndefined(found[engine.id])) {
              result.push(engine);
              return found[engine.id] = true;
            }
          });
        });
      });
      return result;
    },
    colours: function() {
      return this.get('colours');
    },
    getOptionCode: function(options) {
      var engine, grade, result;
      if(_.isArray(options.derivative) === false || options.derivative.length === 0) {
        return;
      }
      result = [];
      grade = _.where(this.get('bodyStyles')[0].grades, {
        hash: options.grade
      })[0];
      engine = _.where(grade.enginesTransmissions, {
        id: options.engine
      })[0];
      if(_.isUndefined(engine)) {
        return;
      }
      _.each(options.derivative, function(name) {
        return result.push(_.where(engine.derivatives, {
          name: name
        })[0].code);
      });
      result = _.sortBy(result, function(code) {
        return code;
      });
      return result.join('').replace(/##/g, '#');
    },
    allOptions: function() {
      var found, result;
      found = {};
      result = [];
      _.each(this.get('bodyStyles'), function(bodyStyle) {
        return _.each(bodyStyle.grades, function(grade) {
          return _.each(grade.enginesTransmissions, function(engine) {
            return _.each(engine.derivatives, function(derivative) {
              if(_.isUndefined(found[derivative.code])) {
                result.push(derivative);
              }
              return found[derivative.code] = true;
            });
          });
        });
      });
      return result;
    },
    options: function(selectedModel, selectedEngine) {
      var result;
      if(!(_.isObject(selectedModel) && _.isObject(selectedEngine))) {
        return [];
      }
      result = this.allOptions();
      _.each(this.getSelectedEngine(selectedModel, selectedEngine).derivatives, function(derivative) {
        return _.each(result, function(option, idx) {
          if(option.name === derivative.name) {
            return result[idx] = derivative;
          }
        });
      });
      return result;
    },
    getDerivativeCode: function(selectedModel, selectedEngine, selectedOptions) {
      var codes, engine, fullCode;
      engine = this.getSelectedEngine(selectedModel, selectedEngine);
      codes = [];
      selectedOptions.each(function(option) {
        return codes.push(_.where(engine.derivatives, {
          name: option.get('name')
        })[0].code);
      });
      codes = _.map(_.sortBy(codes, function(code) {
        return code;
      }), function(code) {
        return code.replace(/#/g, '');
      });
      if(codes.length) {
        fullCode = '#' + codes.join('#') + '#';
      } else {
        fullCode = '';
      }
      return _.where(engine.derivatives, {
        code: fullCode
      })[0].derivativeCode;
    },
    getCompositeCode: function(selectedModel, selectedEngine, selectedOptions) {
      var codes, derivative, engine, fullCode;
      engine = this.getSelectedEngine(selectedModel, selectedEngine);
      codes = [];
      selectedOptions.each(function(option) {
        return codes.push(_.where(engine.derivatives, {
          name: option.get('name')
        })[0].code);
      });
      codes = _.map(_.sortBy(codes, function(code) {
        return code;
      }), function(code) {
        return code.replace(/#/g, '');
      });
      if(codes.length) {
        fullCode = '#' + codes.join('#') + '#';
      } else {
        fullCode = '';
      }
      derivative = _.where(engine.derivatives, {
        code: fullCode
      })[0];
      return derivative.rangeCode + derivative.derivativeCode;
    },
    getSelectedEngine: function(selectedModel, selectedEngine) {
      var result;
      result = '';
      _.each(this.get('bodyStyles'), function(bodyStyle) {
        return _.each(bodyStyle.grades, function(grade) {
          if(selectedModel.get('grade').code === grade.code && selectedModel.get('grade').bodyStyle.id === grade.bodyStyle.id) {
            return _.each(grade.enginesTransmissions, function(engine) {
              if(selectedEngine.get('id') === engine.id) {
                return result = engine;
              }
            });
          }
        });
      });
      return result;
    },
    getBodyStyleToggle: function() {
      var bodyStyles;
      bodyStyles = [];
      _.each(this.get('bodyStyles'), function(bodyStyle) {
        return _.each(bodyStyle.grades, function(grade) {
          if(_.where(bodyStyles, {
            id: grade.bodyStyle.id
          }).length === 0) {
            return bodyStyles.push(grade.bodyStyle);
          }
        });
      });
      return this.getBodyStyleDiff(bodyStyles);
    },
    getBodyStyleDiff: function(bodyStyles) {
      var doors, names, result, seats;
      names = [];
      doors = [];
      seats = [];
      _.each(bodyStyles, function(bodyStyle) {
        var bodyStyleName;
        bodyStyleName = bodyStyle.name;
        if(!_.contains(names, bodyStyleName)) {
          names.push(bodyStyleName);
        }
        if(!_.contains(doors, bodyStyle.numberOfDoors)) {
          doors.push(bodyStyle.numberOfDoors);
        }
        if(!_.contains(seats, bodyStyle.numberOfSeats)) {
          return seats.push(bodyStyle.numberOfSeats);
        }
      });
      if(names.length > 1) {
        result = {
          toggle: 'name',
          options: names,
          name: ''
        };
      } else if(doors.length > 1) {
        result = {
          toggle: 'numberOfDoors',
          options: doors,
          name: 'Door'
        };
      } else {
        result = {
          toggle: 'numberOfSeats',
          options: seats,
          name: 'Seat'
        };
      }
      return result;
    },
    rangeName: function() {
      return this.get('name');
    },
    getBodyStyle: function(id) {
      var _this = this;
      return _.last(_.filter(this.get('bodyStyles')[0].grades, function(grade) {
        return grade.bodyStyle.id === parseInt(id);
      })).bodyStyle;
    }
  });
  return Vehicle;
});
